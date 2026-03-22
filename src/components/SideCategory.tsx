'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  categories: string[];
}

export default function SideCategory({ categories }: Props) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-28 hidden w-52 shrink-0 xl:block">
      <nav className="flex flex-col gap-2">
        <h3 className="mb-4 px-4 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
          Categories
        </h3>
        {categories.map((cat) => {
          // 카테고리별 경로 설정 (All은 홈으로, 나머지는 해당 카테고리 페이지로)
          const href = cat === 'All' ? '/' : `/categories/${cat}`;
          const isActive = pathname === href;

          return (
            <Link
              key={cat}
              href={href}
              className={`group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {cat}
              {!isActive && <span className="text-[10px] opacity-0 transition-opacity group-hover:opacity-100">→</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
