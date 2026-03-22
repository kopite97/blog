import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeShiki from '@shikijs/rehype';

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
  const categories = allPosts.map((post) => post.category);
  return [...new Set(categories)];
}
