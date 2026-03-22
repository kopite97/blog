// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect를 통해 클라이언트 사이드에서만 버튼이 렌더링되도록 하여 해이드레이션 오류를 방지합니다.
  useEffect(() => setMounted(true), []);

  return (
    // 네비바 배경색 다크모드 대응
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black tracking-tighter text-blue-600 dark:text-blue-400">
          Kopite97's Blog
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Link href="/" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
            Blog
          </Link>
          <Link
            href="https://github.com/kopite97"
            target="_blank"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            GitHub
          </Link>
          {/* 다크모드 토글 버튼 (mounted 된 후에만 렌더링) */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="flex w-16 items-center justify-center rounded-full border border-gray-200 bg-white py-1.5 text-xs font-bold tracking-widest text-gray-500 uppercase shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
              aria-label="Toggle Dark Mode"
            >
              {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
