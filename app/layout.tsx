import './globals.css';
import { ThemeProvider } from '@/src/components/ThemeProvider';
import Navbar from '@/src/components/Navbar';
import SideCategory from '@/src/components/SideCategory';
// 1. 새롭게 만든 getCategoryTree 임포트
import { getCategoryTree } from '@/src/lib/posts';

export const metadata = {
  metadataBase: new URL('https://kopite97.github.io/blog'),
  applicationName: "Kopite97's Blog",
  title: {
    default: "Kopite97's Blog",
    template: "%s | Kopite97's Blog",
  },
  description: '배우고 기록하는 거 좋아합니다.',
  keywords: ['Unity', 'Java', 'Next.js', '게임 개발', '개발 블로그'],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Kopite97's Blog",
    description: '배우고 기록하는 거 좋아합니다.',
    url: 'https://kopite97.github.io/blog',
    siteName: "Kopite97's Blog",
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 2. 트리 형태의 카테고리 데이터와 전체 개수를 가져옵니다.
  const { tree, totalCount } = getCategoryTree();

  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <Navbar />

          <div className="mx-auto flex max-w-[1440px] items-start gap-10 px-6">
            {/* 3. SideCategory에 tree와 totalCount를 넘겨줍니다. */}
            <SideCategory tree={tree} totalCount={totalCount} />

            <main className="min-w-0 flex-1 pt-10 pb-20">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
