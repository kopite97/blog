import './globals.css';
import { ThemeProvider } from '@/src/components/ThemeProvider';
import Navbar from '@/src/components/Navbar';
import SideCategory from '@/src/components/SideCategory';
import { getCategoryData } from '@/src/lib/posts';

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
  const { categories, counts, totalCount } = getCategoryData();

  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <Navbar />

          {/* 변경점 1: max-w-7xl을 max-w-[1440px]로 넓혀서 큰 모니터에 대응합니다. */}
          <div className="mx-auto flex max-w-[1440px] items-start gap-10 px-6">
            <SideCategory categories={categories} counts={counts} totalCount={totalCount} />

            {/* 변경점 2: 본문이 남은 공간을 넓게 쓰도록 max-w-3xl을 지웠습니다. */}
            <main className="min-w-0 flex-1 pt-10 pb-20">{children}</main>

            {/* 변경점 3: 불필요하게 공간을 차지하던 우측 더미 <div>를 삭제했습니다. */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
