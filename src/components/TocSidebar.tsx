'use client';

import { useEffect, useState } from 'react';
import { TocItem } from '../lib/posts';
import Link from 'next/link';

export default function TocSideBar({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 현재 화면에 보이는 제목을 감지하는 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id); // 화면에 들어온 제목의 ID 저장
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px', // 화면 상단 80px 지점부터 감지
        threshold: 1.0,
      },
    );

    // 목차에 있는 모든 제목 요소들을 감시 대상 등록
    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  return (
    <aside className="hidden lg:block lg:w-64">
      <div className="sticky top-24 border-l-2 border-gray-100 pl-4">
        <h4 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">On this page</h4>
        <nav>
          <ul className="space-y-3.5 text-sm font-medium">
            {toc.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.depth - 2) * 1}rem` }}
                className={`transition-all duration-200 ${
                  activeId === item.id
                    ? 'translate-x-1 font-bold text-blue-600' // 활성화 시 파란색 + 살짝 이동
                    : 'text-gray-500 hover:text-blue-400'
                }`}
              >
                <Link href={`#${item.id}`} className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
