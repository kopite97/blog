import Link from 'next/link';
import { getSortedPostsData } from '@/src/lib/posts';

type Props = {
  // Catch-all Segments에 대응하기 위해 category는 string[] 형태입니다.
  params: Promise<{ category: string[] }>;
};

/**
 * 빌드 타임에 정적 페이지들을 미리 생성하는 함수입니다.
 */
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const paths = new Set<string>();

  posts.forEach((post) => {
    if (post.category) {
      // 'Develop/Next.js' -> ['Develop', 'Next.js']
      const segments = post.category.split('/').map((s) => s.trim());

      // 계층별로 모든 경로를 생성합니다.
      // 예: 'Develop/Next.js'가 있다면 'Develop' 경로와 'Develop/Next.js' 경로를 모두 등록
      let currentPath = '';
      segments.forEach((seg, index) => {
        currentPath = index === 0 ? seg : `${currentPath}/${seg}`;
        paths.add(currentPath);
      });
    }
  });

  // Next.js 규칙에 따라 경로 문자열을 '/' 기준으로 잘라 배열로 반환합니다.
  return Array.from(paths).map((path) => ({
    category: path.split('/'),
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // 1. URL 배열을 다시 슬래시(/)로 합쳐서 비교용 문자열로 만듭니다.
  // decodeURIComponent를 써야 한글 카테고리가 깨지지 않습니다.
  const decodedCategoryPath = category.map((c) => decodeURIComponent(c)).join('/');

  const allPosts = getSortedPostsData();

  // 2. 포스트 필터링: 정확히 일치하거나, 하위 카테고리에 속한 글들을 모두 가져옵니다.
  const filteredPosts = allPosts.filter((post) => {
    const postCat = post.category || '';

    // 정확히 일치하는 경우 (예: 'Develop/Next.js' === 'Develop/Next.js')
    const isExactMatch = postCat === decodedCategoryPath;

    // 하위 카테고리인 경우 (예: 'Develop/Next.js'는 'Develop'의 하위)
    const isSubCategory = postCat.startsWith(`${decodedCategoryPath}/`);

    return isExactMatch || isSubCategory;
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

      {/* 포스트 리스트 디자인 */}
      <div className="grid gap-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ id, date, title, description }) => (
            <article key={id} className="group relative flex flex-col items-start">
              <time className="mb-2 text-sm text-gray-400 dark:text-gray-500">{date}</time>
              <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white">
                <Link href={`/posts/${id}`}>
                  {/* 카드 전체 클릭 영역 확장 스타일 */}
                  <span className="absolute -inset-x-4 -inset-y-2.5 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-gray-800/50" />
                  <span className="relative z-10">{title}</span>
                </Link>
              </h3>
              {description && (
                <p className="relative z-10 mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
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
