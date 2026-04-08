import Link from 'next/link';

interface Props {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: Props) {
  // 페이지가 1개뿐이면 렌더링하지 않음
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-16 flex items-center justify-center gap-2">
      {/* 이전 버튼 (1페이지면 비활성화 느낌) */}
      {currentPage > 1 ? (
        <Link
          href={`/?page=${currentPage - 1}`}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          &lt;
        </Link>
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 text-gray-300 dark:border-gray-800/50 dark:text-gray-600">
          &lt;
        </span>
      )}

      {/* 페이지 숫자 버튼들 */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isActive = page === currentPage;
        return (
          <Link
            key={page}
            href={`/?page=${page}`}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-all ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' // 사이드바 활성화 버튼과 동일한 블루 포인트
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* 다음 버튼 */}
      {currentPage < totalPages ? (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          &gt;
        </Link>
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 text-gray-300 dark:border-gray-800/50 dark:text-gray-600">
          &gt;
        </span>
      )}
    </nav>
  );
}
