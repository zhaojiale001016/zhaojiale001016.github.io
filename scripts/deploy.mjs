// 部署 dist/ 到 GitHub Pages（master 分支）
import { execSync } from 'node:child_process';
import { existsSync, rmSync, cpSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const repo = path.join(root, '.deploy_git');
const remote = 'git@github.com:zhaojiale001016/zhaojiale001016.github.io.git';

if (!existsSync(dist)) {
  console.error('dist 不存在，请先运行 npm run build');
  process.exit(1);
}

rmSync(repo, { recursive: true, force: true });
mkdirSync(repo, { recursive: true });
const git = (args, cwd = repo) => execSync(`git ${args}`, { cwd, stdio: 'inherit' });

git('init -b master');
git(`remote add origin ${remote}`);
cpSync(dist, repo, { recursive: true });
writeFileSync(path.join(repo, '.nojekyll'), '');
git('add -A');
git(`commit -m "Site updated: ${new Date().toISOString().slice(0, 19).replace('T', ' ')}"`);
git('push -u origin master --force');
console.log('Deploy done.');
