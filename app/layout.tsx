import './globals.css';
import { ThemeProvider } from '@/src/components/ThemeProvider';
import Navbar from '@/src/components/Navbar';
import SideCategory from '@/src/components/SideCategory';
import { getAllCategories } from '@/src/lib/posts';

export const metadata = {
  title: "Kopite97's blog",
  description: '이것저것 다 해보는 사람',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 서버 컴포넌트에서 직접 데이터를 가져옵니다.
  const categories = getAllCategories();

  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-[Pretendard] text-gray-900 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <Navbar />

          {/* 중앙 정렬 컨테이너 */}
          <div className="mx-auto flex max-w-7xl justify-center gap-10 px-6">
            {/* 좌측: 카테고리 사이드바 */}
            <SideCategory categories={categories} />

            {/* 중앙: 실제 콘텐츠 (홈 화면 또는 포스트 상세) */}
            <main className="max-w-3xl min-w-0 flex-1 pt-10 pb-20">{children}</main>

            {/* 우측: 우측 사이드바 공간 (포스트 페이지의 ToC가 들어갈 자리) */}
            <div className="hidden w-64 shrink-0 lg:block" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
