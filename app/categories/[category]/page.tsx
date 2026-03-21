import Link from 'next/link';
import { getSortedPostsData } from '@/src/lib/posts';

type Props = {
  params: Promise<{ category: string }>;
};

// 1. 어떤 카테고리들이 있는지 Next.js에게 미리 알려줌
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category); // 한글 카테고리 대응
  
  const allPosts = getSortedPostsData();
  const filteredPosts = allPosts.filter((post) => post.category === decodedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto">
        <header className="mb-12">
          <Link href="/" className="text-sm text-blue-500 hover:underline">← 전체 글로 돌아가기</Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">
            <span className="text-blue-600">#{decodedCategory}</span> 글 목록
          </h1>
        </header>

        <div className="grid gap-6">
          {filteredPosts.map(({ id, date, title, description }) => (
            <article key={id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <time className="text-sm text-gray-400">{date}</time>
              <h3 className="text-xl font-bold mt-1 hover:text-blue-600">
                <Link href={`/posts/${id}`}>{title}</Link>
              </h3>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}