import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeShiki from '@shikijs/rehype';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

export interface PostData {
  id: string;
  date: string;
  title: string;
  category: string;
  description?: string;
  contentHtml?: string;
  toc?: TocItem[];
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // App Router용 형식: [{ id: 'post1' }, { id: 'post2' }]
  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
  }));
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string; category: string; description?: string }),
    };
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const toc: TocItem[] = [];

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(remarkGfm)
    .use(html)
    .use(() => (tree: any) => {
      tree.children.forEach((node: any) => {
        if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
          const text = node.children
            .filter((child: any) => child.type === 'text')
            .map((child: any) => child.value)
            .join('');
          const id = node.properties?.id || '';
          const depth = parseInt(node.tagName.replace('h', ''), 10);
          toc.push({ id, text, depth });
        }
      });
    })
    .use(rehypeShiki, { theme: 'github-dark' })
    .use(rehypeStringify)
    .process(matterResult.content);

  return {
    id,
    contentHtml: processedContent.toString(),
    toc,
    ...(matterResult.data as { date: string; title: string; category: string; description?: string }),
  };
}

export function getAllCategories() {
  const allPosts = getSortedPostsData();
  const categories = allPosts.map((post) => post.category || 'Etc');
  return ['All', ...Array.from(new Set(categories))];
}

export function getAdjacentPosts(id: string) {
  const allPosts = getSortedPostsData();
  const currentIndex = allPosts.findIndex((post) => post.id === id);

  // 날짜 기준 내림차순(최신순)이므로:
  // index - 1 이 '다음 글' (더 최신글)
  // index + 1 이 '이전 글' (더 예전글)
  return {
    prevPost: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    nextPost: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
  };
}

export type CategoryTree = {
  [main: string]: {
    count: number; // 대분류 전체 글 개수
    subCategories: Record<string, number>; // 소분류 이름과 개수
  };
};

export function getCategoryTree() {
  const allPosts = getSortedPostsData();
  const tree: CategoryTree = {};
  let totalCount = 0;

  allPosts.forEach((post) => {
    totalCount++;
    const catString = post.category || 'Uncategorized';

    // 슬래시(/)를 기준으로 대분류와 소분류 분리 (앞뒤 공백 제거)
    const parts = catString.split('/').map((p) => p.trim());
    const mainCat = parts[0];
    const subCat = parts.length > 1 ? parts[1] : null;

    // 1. 대분류 등록
    if (!tree[mainCat]) {
      tree[mainCat] = { count: 0, subCategories: {} };
    }
    tree[mainCat].count++;

    // 2. 소분류가 있다면 등록
    if (subCat) {
      if (!tree[mainCat].subCategories[subCat]) {
        tree[mainCat].subCategories[subCat] = 0;
      }
      tree[mainCat].subCategories[subCat]++;
    }
  });

  return { tree, totalCount };
}
