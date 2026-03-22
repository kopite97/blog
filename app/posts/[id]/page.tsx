import { getPostData, getAllPostIds, getAdjacentPosts } from '@/src/lib/posts';
import Link from 'next/link';
import ReadingProgress from '@/src/components/ReadingProgress';
import TocSidebar from '@/src/components/TocSidebar';
import Comments from '@/src/components/Comments';
import PostNav from '@/src/components/PostNav';

export async function generateStaticParams() {
  return getAllPostIds();
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Post({ params }: Props) {
  const { id } = await params;
  const postData = await getPostData(id);
  const { prevPost, nextPost } = getAdjacentPosts(id);

  return (
    <div className="relative w-full">
      <ReadingProgress />
      <div className="mx-auto flex max-w-6xl flex-col lg:flex-row lg:gap-16">
        {/* 본문 섹션 */}
        <div className="min-w-0 flex-1">
          <header className="mb-12 border-b border-gray-100 pb-12 dark:border-gray-800">
            <Link
              href="/"
              className="mb-8 inline-flex items-center text-sm font-semibold text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← 전체 글로 돌아가기
            </Link>

            <div className="mb-4 flex items-center gap-3">
              <Link
                href={`/categories/${encodeURIComponent(postData.category)}`}
                className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 transition-all hover:scale-105 hover:bg-blue-100 active:scale-95 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
              >
                {postData.category}
              </Link>
              <time className="text-sm font-medium text-gray-400">{postData.date}</time>
            </div>

            <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              {postData.title}
            </h1>
            <p className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">{postData.description}</p>
          </header>

          <article className="prose prose-blue prose-lg prose-headings:font-black dark:prose-invert prose-pre:p-0 prose-pre:bg-transparent max-w-none dark:text-gray-200">
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
          </article>
          <PostNav prevPost={prevPost} nextPost={nextPost} />
          <Comments />

          <footer className="mt-20 rounded-3xl bg-gray-50 p-8 dark:bg-gray-900">
            <div className="flex items-center gap-4">
              <img
                src="https://github.com/kopite97.png"
                alt="프로필"
                className="h-14 w-14 rounded-full border-2 border-white shadow-md dark:border-gray-700"
              />
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">노석준 (Kopite97)</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">배움을 즐기는 개발자</p>
              </div>
            </div>
          </footer>
        </div>

        {/* TocSidebar는 layout.tsx의 우측 빈 공간과 겹치지 않도록 위치를 확인 */}
        {postData.toc && postData.toc.length > 0 && (
          <div className="hidden shrink-0 lg:block lg:w-64">
            <div className="sticky top-28">
              <TocSidebar toc={postData.toc} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
