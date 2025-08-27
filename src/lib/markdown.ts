import fs from 'node:fs/promises';
import path from 'node:path';

export interface MarkdownPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  publishedDate: string;
  tags: string[];
  featured: boolean;
  source: 'md';
  contentRaw?: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function toSlug(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, '').trim();
}

function extractTitle(markdown: string, fallback: string): string {
  const lines = markdown.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^#\s+(.+)/);
    if (m) return m[1].trim();
  }
  return fallback;
}

function extractSummary(markdown: string): string {
  const cleaned = markdown
    .replace(/^# .*$/m, '')
    .replace(/```[\s\S]*?```/g, '')
    .trim();
  const m = cleaned.match(/^(.*)$/m);
  return (m?.[1] || '').trim();
}

export async function getMarkdownPosts(): Promise<MarkdownPost[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const mdFiles = files.filter((f) => f.toLowerCase().endsWith('.md'));

    const posts: MarkdownPost[] = [];
    for (const file of mdFiles) {
      const full = path.join(BLOG_DIR, file);
      const [buf, stat] = await Promise.all([fs.readFile(full, 'utf8'), fs.stat(full)]);
      const slug = toSlug(file);
      const title = extractTitle(buf, slug);
      const summary = extractSummary(buf);
      const publishedDate = (stat.mtime || new Date()).toISOString();
      posts.push({
        id: `md:${slug}`,
        title,
        slug,
        summary,
        publishedDate,
        tags: [],
        featured: false,
        source: 'md',
      });
    }

    // 최신순 정렬
    return posts.sort((a, b) =>
      (b.publishedDate || '').localeCompare(a.publishedDate || ''),
    );
  } catch {
    // 디렉터리가 없거나 기타 오류 시 빈 배열 반환
    return [];
  }
}

export async function getMarkdownPost(slug: string): Promise<MarkdownPost | null> {
  try {
    const full = path.join(BLOG_DIR, `${slug}.md`);
    const [buf, stat] = await Promise.all([fs.readFile(full, 'utf8'), fs.stat(full)]);

    const title = extractTitle(buf, slug);
    const summary = extractSummary(buf);
    const publishedDate = (stat.mtime || new Date()).toISOString();

    return {
      id: `md:${slug}`,
      title,
      slug,
      summary,
      publishedDate,
      tags: [],
      featured: false,
      source: 'md',
      contentRaw: buf,
    };
  } catch {
    return null;
  }
}
