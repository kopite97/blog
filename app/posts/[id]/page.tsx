// app/posts/[id]/page.tsx
import { getPostData, getAllPostIds } from '@/src/lib/posts';
import Link from 'next/link';
import ReadingProgress from '@/src/components/ReadingProgress';
import TocSideBar from '@/src/components/TocSidebar';
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
    <div className="min-h-screen bg-white pb-24 font-[Pretendard]">
      <ReadingProgress />

      <main className="mx-auto max-w-5xl px-6 pt-24">
        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* 본문 섹션 */}
          <div className="flex-1 lg:max-w-3xl">
            <header className="mb-12 border-b border-gray-100 pb-12">
              <Link
                href="/"
                className="mb-8 inline-flex items-center text-sm font-semibold text-blue-500 hover:text-blue-700"
              >
                ← 전체 글로 돌아가기
              </Link>

              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                  {postData.category}
                </span>
                <time className="text-sm font-medium text-gray-400">{postData.date}</time>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">{postData.title}</h1>
              <h4 className="font-black">{postData.description}</h4>
            </header>
            <article className="prose prose-blue prose-lg prose-headings:font-black prose-pre:p-0 prose-pre:bg-transparent max-w-none">
              <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
            </article>
            <Comments /> {/** 댓글 */}
            {/* 하단 작성자 프로필 */}
            <footer className="mt-24 rounded-3xl bg-gray-50 p-8">
              <div className="flex items-center gap-4">
                <img
                  src="https://github.com/kopite97.png"
                  alt="프로필"
                  className="h-14 w-14 rounded-full border-2 border-white shadow-md"
                />
                <div>
                  <p className="text-lg font-bold text-gray-900">노석준 (Kopite97)</p>
                  <p className="text-sm text-gray-500">배움을 즐기는 풀스택 개발자</p>
                </div>
              </div>
            </footer>
          </div>

          {/* 우측 사이드바 (자동 목차) */}
          {postData.toc && postData.toc.length > 0 && <TocSideBar toc={postData.toc} />}
        </div>
      </main>
    </div>
  );
}
