import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: string }) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
  return rss({
    title: '豆芽的技术博客',
    description: '前端、AI、游戏、硬件与技术圈观察',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/posts/${p.id}`,
      categories: [p.data.category, ...p.data.tags],
    })),
  });
}
