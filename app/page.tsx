import Link from 'next/link';
import { getSortedPostsData } from '@/src/lib/posts';
import TechStackFilter from '@/src/components/TechStackFilter';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    // 전체 배경 다크모드 적용: dark:bg-gray-950
    <div className="min-h-screen bg-gray-50/50 transition-colors duration-300 dark:bg-gray-950">
      <main className="mx-auto max-w-3xl px-6 py-20">
        <header className="mb-24 text-center">
          <div className="mb-8 flex justify-center">
            <Link
              href="https://github.com/kopite97"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
              <img
                src="https://github.com/kopite97.png"
                alt="노석준 프로필"
                className="relative h-28 w-28 rounded-full border-4 border-white object-cover shadow-2xl dark:border-gray-800"
              />
            </Link>
          </div>

          {/* 제목*/}
          <h1 className="mb-6 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Kopite's Blog
          </h1>

          {/* 설명*/}
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-400">
            이것저것 만져보고 있습니다 <br className="hidden sm:block" />
            공유와 기록
          </p>

          <TechStackFilter />
        </header>

        <section className="space-y-10 text-left">
          {/* 구분선 및 소제목*/}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">최신 포스트</h2>
            <span className="text-sm text-gray-400 dark:text-gray-500">총 {allPostsData.length}개의 기록</span>
          </div>

          <div className="grid gap-10">
            {allPostsData.map(({ id, date, title, category, description }) => (
              <article
                key={id}
                // 카드 배경, 테두리
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:shadow-none dark:hover:border-blue-900/50"
              >
                <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <time className="text-sm font-medium text-gray-400 dark:text-gray-500">{date}</time>
                    <Link href={`/categories/${category}`}>
                      {/* 카테고리 뱃지  */}
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                        {category}
                      </span>
                    </Link>
                  </div>

                  {/* 포스트 제목*/}
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-3xl dark:text-white dark:group-hover:text-blue-400">
                    <Link href={`/posts/${id}`}>{title}</Link>
                  </h3>

                  {description && (
                    <p className="mb-6 line-clamp-2 text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-400">
                      {description}
                    </p>
                  )}

                  <div className="mt-auto">
                    {/* 더 읽어보기 */}
                    <Link
                      href={`/posts/${id}`}
                      className="inline-flex items-center font-bold text-blue-500 transition-all hover:gap-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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

      {/* 푸터 */}
      <footer className="mt-32 border-t border-gray-100 py-12 text-center text-sm text-gray-400 dark:border-gray-800 dark:text-gray-600">
        <p className="mb-2">열정적으로 배우고 정직하게 기록합니다.</p>
        <p>© 2026 노석준 개발 블로그. All rights reserved.</p>
      </footer>
    </div>
  );
}
