'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Pagination from './Pagination';

interface Post {
  id: string;
  date: string;
  title: string;
  category?: string;
  description?: string;
}

export default function PostList({ allPosts }: { allPosts: Post[] }) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const POSTS_PER_PAGE = 5;

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const currentPosts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <>
      <div className="grid gap-10">
        {currentPosts.map(({ id, date, title, category, description }) => (
          <article
            key={id}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:shadow-none dark:hover:border-blue-900/50"
          >
            <Link href={`/posts/${id}`} aria-label={`${title} 포스트로 이동`} className="absolute inset-0 z-10 rounded-3xl" />

            <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative flex flex-col">
              <div className="mb-4 flex items-center gap-3">
                <time className="text-sm font-medium text-gray-400 dark:text-gray-500">{date}</time>
                {category && (
                  <Link href={`/categories/${category}`} className="relative z-20">
                    <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                      {category}
                    </span>
                  </Link>
                )}
              </div>

              <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-3xl dark:text-white dark:group-hover:text-blue-400">
                <span className="relative z-10">{title}</span>
              </h3>

              {description && (
                <p className="mb-6 line-clamp-2 text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-400">
                  {description}
                </p>
              )}

              <div className="relative z-10 mt-auto">
                <span className="inline-flex items-center font-bold text-blue-500 transition-all group-hover:gap-2 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                  더 읽어보기 <span className="ml-1 tracking-widest">→</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
