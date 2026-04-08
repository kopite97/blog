import Link from 'next/link';
import { getSortedPostsData } from '@/src/lib/posts';
import TechStackFilter from '@/src/components/TechStackFilter';
import Pagination from '@/src/components/Pagination'; // 방금 만든 컴포넌트 임포트

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Next.js App Router에서 URL 파라미터를 읽기 위해 async로 변경하고 searchParams를 받습니다.
export default async function Home({ searchParams }: Props) {
  // 1. URL 파라미터 파싱 및 현재 페이지 계산
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const currentPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;

  // 2. 한 페이지당 보여줄 포스트 개수 설정
  const POSTS_PER_PAGE = 10;

  const allPostsData = getSortedPostsData();

  // 카테고리 로직 (유지)
  const categoryCounts = allPostsData.reduce(
    (acc, post) => {
      const cat = post.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const categories = ['All', ...Object.keys(categoryCounts)];

  // 3. 전체 페이지 수 계산 및 현재 페이지에 해당하는 데이터만 잘라내기(Slice)
  const totalPages = Math.ceil(allPostsData.length / POSTS_PER_PAGE);
  const currentPosts = allPostsData.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
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

          <h1 className="mb-6 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Kopite97's Blog
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-400">
            이것저것 만져보고 있습니다 <br className="hidden sm:block" />
            공유와 기록
          </p>
          <TechStackFilter />
        </header>

        <section className="space-y-10 text-left">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">최신 포스트</h2>
            {/* 전체 포스트 개수 표시 */}
            <span className="text-sm text-gray-400 dark:text-gray-500">총 {allPostsData.length}개의 기록</span>
          </div>

          <div className="grid gap-10">
            {/* 4. allPostsData 대신 잘라낸 currentPosts를 맵핑합니다. */}
            {currentPosts.map(({ id, date, title, category, description }) => (
              <article
                key={id}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:shadow-none dark:hover:border-blue-900/50"
              >
                <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <time className="text-sm font-medium text-gray-400 dark:text-gray-500">{date}</time>
                    <Link href={`/categories/${category}`}>
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                        {category}
                      </span>
                    </Link>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-3xl dark:text-white dark:group-hover:text-blue-400">
                    <Link href={`/posts/${id}`}>{title}</Link>
                  </h3>

                  {description && (
                    <p className="mb-6 line-clamp-2 text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-400">
                      {description}
                    </p>
                  )}

                  <div className="mt-auto">
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

          {/* 5. 리스트 바로 아래에 페이지네이션 컴포넌트를 부착합니다. */}
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </section>
      </main>

      <footer className="mt-32 border-t border-gray-100 py-12 text-center text-sm text-gray-400 dark:border-gray-800 dark:text-gray-600">
        <p className="mb-2">배우고 기록하는거 좋아합니다.</p>
        <p>© 2026 노석준 개발 블로그. All rights reserved.</p>
      </footer>
    </div>
  );
}
