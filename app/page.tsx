import Link from 'next/link';
import { Suspense } from 'react';
import { getSortedPostsData } from '@/src/lib/posts';
import TechStackFilter from '@/src/components/TechStackFilter';
import PostList from '@/src/components/PostList';

export default function Home() {
  // 서버 사이드에서 모든 포스트 데이터를 미리 가져옵니다.
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-50/50 transition-colors duration-300 dark:bg-gray-950">
      <main className="mx-auto max-w-3xl px-6 py-20">
        {/* 헤더 섹션: 프로필 및 블로그 소개 */}
        <header className="mb-24 text-center">
          <div className="mb-8 flex justify-center">
            <Link
              href="https://github.com/kopite97"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block"
            >
              {/* 리버풀 팬심을 담은 레드 그라데이션 글로우 효과 */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
              <img
                src="https://github.com/kopite97.png"
                alt="노석준 프로필"
                className="relative h-28 w-28 rounded-full border-4 border-white object-cover shadow-2xl dark:border-gray-800"
              />
            </Link>
          </div>

          <h1 className="mb-6 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Kopite97's Blog
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-400">
            이것저것 만져보고 있습니다 <br className="hidden sm:block" />
            공유와 기록
          </p>

          {/* 기술 스택 필터 컴포넌트 */}
          <TechStackFilter />
        </header>

        {/* 포스트 리스트 섹션 */}
        <section className="space-y-10 text-left">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">최신 포스트</h2>
            <span className="text-sm text-gray-400 dark:text-gray-500">총 {allPostsData.length}개의 기록</span>
          </div>

          {/* [중요] searchParams(URL 파라미터)를 사용하는 컴포넌트는 
            반드시 Suspense로 감싸야 정적 빌드(Static Export) 시 에러가 나지 않습니다. 
          */}
          <Suspense
            fallback={
              <div className="py-20 text-center text-gray-500 dark:text-gray-400">포스트를 불러오는 중입니다...</div>
            }
          >
            <PostList allPosts={allPostsData} />
          </Suspense>
        </section>
      </main>

      {/* 푸터 섹션 */}
      <footer className="mt-32 border-t border-gray-100 py-12 text-center text-sm text-gray-400 dark:border-gray-800 dark:text-gray-600">
        <p className="mb-2">배우고 기록하는거 좋아합니다.</p>
        <p>© 2026 노석준 개발 블로그. All rights reserved.</p>
      </footer>
    </div>
  );
}
