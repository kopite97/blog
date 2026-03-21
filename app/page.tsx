import Link from 'next/link';
import { getSortedPostsData } from '@/src/lib/posts';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto">
        {/* 상단 프로필 영역 */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            노석준의 개발 로그
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Unity 클라이언트 개발에서 웹 생태계까지, 
            <br />배움의 과정을 기록하고 공유합니다.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">#Unity</span>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">#Next.js</span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">#TypeScript</span>
          </div>
        </header>

        {/* 글 목록 영역 */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">최신 포스트</h2>
          <div className="grid gap-8">
            {allPostsData.map(({ id, date, title, description }) => (
              <article key={id} className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col">
                  <time className="text-sm text-gray-400 mb-2">{date}</time>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    <Link href={`/posts/${id}`}>
                      {title}
                    </Link>
                  </h3>
                  {description && (
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {description}
                    </p>
                  )}
                  <div className="mt-4">
                    <Link href={`/posts/${id}`} className="text-sm font-semibold text-blue-500 hover:text-blue-700">
                      더 읽어보기 →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}