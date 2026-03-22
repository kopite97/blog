import Link from 'next/link';

interface PostSummary {
  id: string;
  title: string;
}

interface Props {
  prevPost: PostSummary | null;
  nextPost: PostSummary | null;
}

export default function PostNav({ prevPost, nextPost }: Props) {
  return (
    <nav className="mt-16 flex flex-col gap-4 border-t border-gray-100 pt-12 sm:flex-row dark:border-gray-800">
      {/* 이전 글 (왼쪽) */}
      <div className="flex-1">
        {prevPost && (
          <Link href={`/posts/${prevPost.id}`} className="group block h-full">
            <div className="flex h-full flex-col rounded-2xl border border-gray-100 p-6 transition-all hover:bg-gray-50 hover:shadow-md dark:border-gray-800 dark:hover:bg-gray-900">
              <span className="mb-2 text-xs font-bold text-gray-400">이전 글</span>
              <span className="text-sm font-bold text-gray-700 transition-colors group-hover:text-blue-600 dark:text-gray-300">
                ← {prevPost.title}
              </span>
            </div>
          </Link>
        )}
      </div>

      {/* 다음 글 (오른쪽) */}
      <div className="flex-1 text-right">
        {nextPost && (
          <Link href={`/posts/${nextPost.id}`} className="group block h-full">
            <div className="flex h-full flex-col items-end rounded-2xl border border-gray-100 p-6 transition-all hover:bg-gray-50 hover:shadow-md dark:border-gray-800 dark:hover:bg-gray-900">
              <span className="mb-2 text-xs font-bold text-gray-400">다음 글</span>
              <span className="text-sm font-bold text-gray-700 transition-colors group-hover:text-blue-600 dark:text-gray-300">
                {nextPost.title} →
              </span>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
