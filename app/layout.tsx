import './globals.css';
import { ThemeProvider } from '@/src/components/ThemeProvider';
import Navbar from '@/src/components/Navbar';

export const metadata = {
  title: "Kopite97's blog",
  description: '이것저것 다 해보는 사람',
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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
