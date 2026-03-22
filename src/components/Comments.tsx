'use client';

import { useEffect, useRef } from 'react';

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    // --- 아래 값들을 본인의 설정에 맞게 수정하세요 ---
    script.setAttribute('data-repo', 'kopite97/blog');
    script.setAttribute('data-repo-id', 'R_kgDORs0AwQ');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDORs0Awc4C5ATP');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'ko');
    // ------------------------------------------

    ref.current.appendChild(script);
  }, []);

  return <section className="mt-10 border-t border-gray-100 pt-10" ref={ref} />;
}
