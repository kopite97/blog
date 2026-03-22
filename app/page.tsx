// app/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/src/lib/posts';
import Navbar from '@/src/components/Navbar';
import TechStackFilter from '@/src/components/TechStackFilter';

export default function Home() {
  // 서버 측에서 포스트 데이터를 가져옵니다.
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 상단 고정 네비게이션 바 */}
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-20">
        {/* --- 헤더 영역: 프로필 및 자기소개 --- */}
        <header className="mb-24 text-center">
          <div className="mb-8 flex justify-center">
            <Link
              href="https://github.com/kopite97"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block"
            >
              {/* 프로필 이미지 뒤쪽의 은은한 광채 효과 */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
              <img
                src="https://github.com/kopite97.png"
                alt="노석준 프로필"
                className="relative h-28 w-28 rounded-full border-4 border-white object-cover shadow-2xl"
              />
            </Link>
          </div>

          <h1 className="mb-6 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl">Kopite's Blog</h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            이것저것 만져보고 있습니다 <br className="hidden sm:block" />
            공유와 기록
          </p>

          {/* 기술 스택 필터 (클라이언트 컴포넌트) */}
          <TechStackFilter />
        </header>

        {/* --- 포스트 목록 영역 --- */}
        <section className="space-y-10 text-left">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">최신 포스트</h2>
            <span className="text-sm text-gray-400">총 {allPostsData.length}개의 기록</span>
          </div>

          <div className="grid gap-10">
            {allPostsData.map(({ id, date, title, category, description }) => (
              <article
                key={id}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
              >
                {/* 카드 상단에 마우스 올릴 때만 나타나는 그라데이션 포인트 라인 */}
                <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <time className="text-sm font-medium text-gray-400">{date}</time>
                    <Link href={`/categories/${category}`}>
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100">
                        {category}
                      </span>
                    </Link>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-3xl">
                    <Link href={`/posts/${id}`}>{title}</Link>
                  </h3>

                  {description && (
                    <p className="mb-6 line-clamp-2 text-base leading-relaxed text-gray-500 sm:text-lg">
                      {description}
                    </p>
                  )}

                  <div className="mt-auto">
                    <Link
                      href={`/posts/${id}`}
                      className="inline-flex items-center font-bold text-blue-500 transition-all hover:gap-2 hover:text-blue-700"
                    >
                      더 읽어보기 <span className="ml-1 tracking-widest">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-32 border-t border-gray-100 py-12 text-center text-sm text-gray-400">
        <p className="mb-2">열정적으로 배우고 정직하게 기록합니다.</p>
        <p>© 2026 노석준 개발 블로그. All rights reserved.</p>
      </footer>
    </div>
  );
}
