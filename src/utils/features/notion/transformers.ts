/* eslint-disable @typescript-eslint/no-explicit-any */
import { slugify } from '@/utils/features/notion/config';
import { type BlogPost, PROPERTY_KEYS } from '@/utils/features/notion/types';

export function pickFirst<T = any>(
  obj: any,
  keys: readonly string[],
  picker: (val: any) => T | undefined,
): T | undefined {
  for (const k of keys) {
    if (obj?.[k] !== undefined) {
      const v = picker(obj[k]);
      if (v !== undefined) return v;
    }
  }
  return undefined;
}

export function mapDbPageToPost(page: any): Omit<BlogPost, 'content' | 'mdContentRaw'> {
  const p = page.properties || {};
  const title =
    pickFirst<string>(p, PROPERTY_KEYS.TITLE, (v) => v?.title?.[0]?.plain_text) ||
    '제목 없음';
  const slug =
    pickFirst<string>(p, PROPERTY_KEYS.SLUG, (v) => v?.rich_text?.[0]?.plain_text) ||
    slugify(title) ||
    page.id;
  const summary =
    pickFirst<string>(p, PROPERTY_KEYS.SUMMARY, (v) => v?.rich_text?.[0]?.plain_text) ||
    '';
  const publishedDate =
    pickFirst<string>(p, PROPERTY_KEYS.DATE, (v) => v?.date?.start) ||
    page.created_time ||
    '';
  const tags =
    pickFirst<string[]>(p, PROPERTY_KEYS.TAG, (v) =>
      v?.multi_select?.map((t: any) => t.name),
    ) || [];
  const featured =
    pickFirst<boolean>(p, PROPERTY_KEYS.FEATURED, (v) => v?.checkbox) || false;

  const postTypeRaw = pickFirst<string>(
    p,
    PROPERTY_KEYS.POST_TYPE,
    (v) => v?.select?.name,
  );
  const projectName = pickFirst<string>(
    p,
    PROPERTY_KEYS.PROJECT_NAME,
    (v) => v?.select?.name || v?.rich_text?.[0]?.plain_text,
  );
  const postType: 'note' | 'project' | undefined = postTypeRaw
    ? /project|issue|프로젝트|이슈/i.test(postTypeRaw)
      ? 'project'
      : 'note'
    : projectName
      ? 'project'
      : 'note';

  return {
    id: page.id,
    title,
    slug,
    summary,
    publishedDate,
    tags,
    featured,
    postType,
    projectName,
    source: 'db',
  };
}
