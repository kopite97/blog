'use client'; // 1. 클라이언트 컴포넌트 선언 필수

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CategoryTree } from '@/src/lib/posts';

interface Props {
  tree: CategoryTree;
  totalCount: number;
}

export default function SideCategory({ tree, totalCount }: Props) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-28 hidden w-52 shrink-0 self-start xl:block">
      <nav className="flex flex-col gap-1">
        <h3 className="mb-4 px-4 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
          Categories
        </h3>

        {/* 2. All 버튼 (기존 스타일 복구) */}
        <Link
          href="/"
          className={`group mb-2 flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
            pathname === '/'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
          }`}
        >
          <span>All</span>
          <span
            className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
              pathname === '/' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'
            }`}
          >
            {totalCount}
          </span>
        </Link>

        {/* 3. 트리 렌더링 */}
        {Object.entries(tree)
          .sort()
          .map(([mainCat, data]) => {
            const mainHref = `/categories/${encodeURIComponent(mainCat)}`;
            // 현재 경로가 해당 대분류이거나, 그 하위 소분류인 경우 강조
            const isMainActive = pathname === mainHref || pathname.startsWith(`${mainHref}/`);

            return (
              <div key={mainCat} className="mb-2 flex flex-col gap-1">
                {/* 대분류 버튼 */}
                <Link
                  href={mainHref}
                  className={`group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    isMainActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <span>{mainCat}</span>
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500 dark:bg-gray-800">
                    {data.count}
                  </span>
                </Link>

                {/* 소분류 목록 (소분류가 있을 때만 렌더링) */}
                {Object.keys(data.subCategories).length > 0 && (
                  <div className="ml-6 flex flex-col gap-1 border-l-2 border-gray-100 pl-2 dark:border-gray-800">
                    {Object.entries(data.subCategories)
                      .sort()
                      .map(([subCat, count]) => {
                        const subHref = `/categories/${encodeURIComponent(mainCat)}/${encodeURIComponent(subCat)}`;
                        const isSubActive = pathname === subHref;

                        return (
                          <Link
                            key={subHref}
                            href={subHref}
                            className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors ${
                              isSubActive
                                ? 'font-bold text-blue-600 dark:text-blue-400'
                                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                          >
                            <span className="mr-2 truncate">{subCat}</span>
                            <span className="text-[10px] text-gray-400">{count}</span>
                          </Link>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}
      </nav>
    </aside>
  );
}
