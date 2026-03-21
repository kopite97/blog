// app/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/src/lib/posts';
import TechStackFilter from '@/src/components/techStackFilter'; // 컴포넌트 불러오기

export default function Home() {
  // 서버 컴포넌트이므로 fs가 포함된 이 함수를 안전하게 호출할 수 있습니다.
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-3xl">
        <header className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <Link
              href="https://github.com/kopite97"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-25 blur transition duration-1000 group-hover:opacity-50 group-hover:duration-200"></div>
              <img
                src="https://github.com/kopite97.png"
                alt="노석준 프로필"
                className="relative h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl"
              />
            </Link>
          </div>

          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900">
            Kopite 개발 로그
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            열심히 공부하는 사람.. 이것저것 다 해봅니다
            <br />
            기록과 공유
          </p>

          {/* 분리한 기술 스택 필터 컴포넌트 삽입 */}
          <TechStackFilter />
        </header>

        <section className="space-y-8 text-left">
          <h2 className="border-b pb-2 text-2xl font-bold text-gray-800">
            최신 포스트
          </h2>
          <div className="grid gap-8">
            {allPostsData.map(({ id, date, title, category, description }) => (
              <article
                key={id}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col">
                  <div className="mb-3 flex items-center gap-3">
                    <time className="text-sm text-gray-400">{date}</time>
                    <Link href={`/categories/${category}`}>
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100">
                        {category}
                      </span>
                    </Link>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                    <Link href={`/posts/${id}`}>{title}</Link>
                  </h3>
                  {description && (
                    <p className="mt-3 leading-relaxed text-gray-600">
                      {description}
                    </p>
                  )}
                  <div className="mt-4">
                    <Link
                      href={`/posts/${id}`}
                      className="text-sm font-semibold text-blue-500 hover:text-blue-700"
                    >
                      더 읽어보기 →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 py-8 text-center text-sm text-gray-400">
        <p>© 2026 노석준 개발 블로그. All rights reserved.</p>
      </footer>
    </div>
  );
}
