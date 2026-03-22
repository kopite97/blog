'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  categories: string[];
  counts: Record<string, number>;
  totalCount: number;
}

export default function SideCategory({ categories, counts, totalCount }: Props) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-28 hidden w-52 shrink-0 self-start xl:block">
      <nav className="flex flex-col gap-2">
        <h3 className="mb-4 px-4 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
          Categories
        </h3>
        {categories.map((cat) => {
          const href = cat === 'All' ? '/' : `/categories/${cat}`;
          const isActive = pathname === href;
          // All일 때는 전체 개수, 아니면 해당 카테고리 개수 사용
          const count = cat === 'All' ? totalCount : counts[cat];

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
              <span>{cat}</span>

              {/* 숫자 배지 부분 */}
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
