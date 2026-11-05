import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const data = posts.map((p) => ({
    id: p.id,
    title: p.data.title,
    description: p.data.description,
    category: p.data.category,
    tags: p.data.tags,
    date: p.data.pubDate.toISOString().slice(0, 10),
    body: p.body?.slice(0, 2000) ?? '',
  }));
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
