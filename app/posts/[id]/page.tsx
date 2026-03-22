import { getPostData, getAllPostIds } from '@/src/lib/posts';
import Link from 'next/link';
import ReadingProgress from '@/src/components/ReadingProgress';
import TocSidebar from '@/src/components/TocSidebar';
import Comments from '@/src/components/Comments';

export async function generateStaticParams() {
  return getAllPostIds();
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Post({ params }: Props) {
  const { id } = await params;
  const postData = await getPostData(id);

  return (
    // 페이지 전체 배경색 다크모드 대응
    <div className="min-h-screen bg-white pb-24 dark:bg-gray-950">
      <ReadingProgress />

      <main className="mx-auto max-w-5xl px-6 pt-24">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* 본문 섹션 */}
          <div className="flex-1 lg:max-w-3xl">
            <header className="mb-12 border-b border-gray-100 pb-12 dark:border-gray-800">
              <Link
                href="/"
                className="mb-8 inline-flex items-center text-sm font-semibold text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ← 전체 글로 돌아가기
              </Link>

              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                  {postData.category}
                </span>
                <time className="text-sm font-medium text-gray-400">{postData.date}</time>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                {postData.title}
              </h1>
              <h4 className="prose text-gray-900 dark:text-white">{postData.description}</h4>
            </header>

            {/* 마크다운 본문 다크모드 */}
            <article className="prose prose-blue prose-lg prose-headings:font-black dark:prose-invert prose-pre:p-0 prose-pre:bg-transparent max-w-none dark:text-gray-200">
              <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
            </article>

            {/* 댓글 컴포넌트*/}
            <Comments />

            {/* 하단 작성자 프로필 */}
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

          {/* 우측 사이드바 (TocSidebar.tsx는 스스로 다크모드 처리가 되야함.) */}
          {postData.toc && postData.toc.length > 0 && <TocSidebar toc={postData.toc} />}
        </div>
      </main>
    </div>
  );
}
