'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black tracking-tighter text-blue-600 hover:opacity-80">
          SJ.LOG
        </Link>
        <div className="flex gap-6 text-sm font-medium text-gray-500">
          <Link href="/" className="transition-colors hover:text-blue-600">
            Blog
          </Link>
          <Link href="https://github.com/kopite97" target="_blank" className="transition-colors hover:text-blue-600">
            GitHub
          </Link>
          {/* 나중에 포트폴리오 페이지를 만들면 여기에 추가 */}
        </div>
      </div>
    </nav>
  );
}
