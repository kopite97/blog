'use client';

import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 서버/클라이언트 테마 불일치 에러 방지
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="mt-20 border-t border-gray-100 pt-10 dark:border-gray-800">
      <Giscus
        id="comments"
        repo="kopite97/blog"
        repoId="R_kgDORs0AwQ"
        category="General"
        categoryId="DIC_kwDORs0Awc4C5ATP"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'} //테마 동기화
        lang="ko"
        loading="lazy"
      />
    </section>
  );
}
