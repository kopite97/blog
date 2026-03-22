// app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@/src/components/ThemeProvider';
import Navbar from '@/src/components/Navbar'; // ★ Navbar 불러오기

export const metadata = {
  title: '노석준의 풀스택 로그',
  description: 'Unity와 웹 생태계를 아우르는 풀스택 개발자의 기록',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-[Pretendard] text-gray-900 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          {/* ★ 모든 페이지의 최상단에 Navbar가 고정됩니다! */}
          <Navbar />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
