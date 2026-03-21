import { getPostData, getAllPostIds } from "@/src/lib/posts";
import Link from 'next/link';

type PostProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllPostIds();
}

export default async function Post({ params }: PostProps) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.id);

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-500 mb-8 transition-colors">
          ← 목록으로 돌아가기
        </Link>

        {/* 헤더 섹션 */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            {postData.title}
          </h1>
          <div className="flex items-center text-gray-400 text-sm">
            <time>{postData.date}</time>
            <span className="mx-2">•</span>
            <span>노석준 작성</span>
          </div>
        </header>

        {/* 마크다운 본문 (Typography 적용) */}
        <div 
          className="prose prose-blue prose-lg max-w-none 
          prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
        
        <footer className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm">© 2026 노석준 개발 블로그. All rights reserved.</p>
        </footer>
      </article>
    </div>
  );
}