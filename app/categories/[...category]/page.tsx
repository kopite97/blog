import Link from 'next/link';
import { getSortedPostsData } from '@/src/lib/posts';

type Props = {
  // string이 아니라 string[] (배열)로 받습니다.
  params: Promise<{ category: string[] }>;
};

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = Array.from(new Set(posts.map((post) => post.category).filter(Boolean)));
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // URL 배열을 다시 슬래시(/)로 합쳐서 비교용 문자열로 만듭니다.
  const decodedCategoryPath = category.map((c) => decodeURIComponent(c)).join('/');

  const allPosts = getSortedPostsData();

  // 포스트의 카테고리가 해당 경로로 시작하거나 정확히 일치하는지 확인합니다.
  const filteredPosts = allPosts.filter((post) => {
    const postCat = post.category || '';
    // 예: 현재 페이지가 'Develop'이면 'Develop/Next.js' 글도 모두 보여줌
    return postCat === decodedCategoryPath || postCat.startsWith(`${decodedCategoryPath}/`);
  });

  return (
    <div className="w-full">
      <header className="mb-12">
        <Link
          href="/"
          className="text-sm font-semibold text-blue-500 transition-colors hover:text-blue-700 dark:text-blue-400"
        >
          ← 전체 글로 돌아가기
        </Link>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          <span className="text-blue-600 dark:text-blue-500">#{decodedCategoryPath}</span> 글 목록
          <span className="ml-4 text-lg font-medium text-gray-400 dark:text-gray-500">
            {filteredPosts.length}개의 포스트
          </span>
        </h1>
      </header>

      {/* 2. 메인 페이지와 통일감 있는 리스트 디자인 */}
      <div className="grid gap-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ id, date, title, description }) => (
            <article key={id} className="group relative flex flex-col items-start">
              <time className="mb-2 text-sm text-gray-400 dark:text-gray-500">{date}</time>
              <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white">
                <Link href={`/posts/${id}`}>
                  {/* 카드 전체 클릭을 위한 absolute span  */}
                  <span className="absolute -inset-x-4 -inset-y-2.5 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-gray-800/50" />
                  <span className="relative z-10">{title}</span>
                </Link>
              </h3>
              <p className="relative z-10 mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
              </p>
              <div className="relative z-10 mt-4 flex items-center text-sm font-bold text-blue-500">더 읽어보기 →</div>
            </article>
          ))
        ) : (
          <p className="py-20 text-center text-gray-500">해당 카테고리에 아직 글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
