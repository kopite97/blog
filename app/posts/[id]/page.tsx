import { getPostData, getAllPostIds } from '@/src/lib/posts';
import Link from 'next/link';

type PostProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllPostIds();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.id);

  return {
    title: `${postData.title} | Kopite's Blog`,
    description: postData.description,
  };
}

export default async function Post({ params }: PostProps) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.id);

  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-gray-500 transition-colors hover:text-blue-500"
        >
          ← 목록으로 돌아가기
        </Link>

        {/* 헤더 섹션 */}
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            {postData.title}
          </h1>
          <div className="flex items-center text-sm text-gray-400">
            <time>{postData.date}</time>
            <span className="mx-2">•</span>
            <span>노석준 작성</span>
          </div>
        </header>

        {/* 마크다운 본문 (Typography 적용) */}
        <div
          className="prose prose-blue prose-lg prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        <footer className="mt-16 border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2026 노석준 개발 블로그. All rights reserved.
          </p>
        </footer>
      </article>
    </div>
  );
}
