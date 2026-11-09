// 构建后图片优化：dist 内真实照片转 WebP 并改写 HTML/RSS 引用
import { readdirSync, statSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dist = path.join(process.cwd(), 'dist');
const exts = new Set(['.jpg', '.jpeg', '.png']);
const MAX_W = 1400;
let saved = 0, converted = 0;
const renamed = new Map(); // /img/inline/a.jpg -> /img/inline/a.webp

async function processDir(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    const ext = path.extname(name).toLowerCase();
    if (!exts.has(ext) || !statSync(p).isFile()) continue;
    const before = statSync(p).size;
    if (before < 30 * 1024) continue; // 小图跳过
    const img = sharp(p);
    const meta = await img.metadata();
    const w = meta.width > MAX_W ? MAX_W : undefined;
    const out = p.replace(/\.(jpe?g|png)$/i, '.webp');
    await img.resize({ width: w }).webp({ quality: 78 }).toFile(out);
    const after = statSync(out).size;
    if (after < before * 0.9) {
      rmSync(p);
      renamed.set('/' + path.relative(dist, p).split(path.sep).join('/'),
                  '/' + path.relative(dist, out).split(path.sep).join('/'));
      saved += before - after; converted++;
    } else {
      rmSync(out); // 没省多少就保留原图
    }
  }
}

function walkHtml(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walkHtml(p, files);
    else if (/\.(html|xml)$/.test(name)) files.push(p);
  }
  return files;
}

await processDir(path.join(dist, 'img', 'inline'));
// 头像也压缩（单独目录，较大）
await processDir(path.join(dist, 'img'));

if (renamed.size) {
  for (const f of walkHtml(dist)) {
    let s = readFileSync(f, 'utf8');
    let dirty = false;
    for (const [from, to] of renamed) {
      if (s.includes(from)) { s = s.split(from).join(to); dirty = true; }
    }
    if (dirty) writeFileSync(f, s);
  }
}
console.log(`optimize-images: ${converted} 张转 WebP，节省 ${(saved / 1024 / 1024).toFixed(1)} MB`);
