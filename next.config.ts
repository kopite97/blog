import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 정적 HTML 파일로 출력하도록 설정
  output : 'export',

  // Github Pages에서는 Next.js의 이미지 최적화 서버를 쓸 수 없으므로 비활성화
  images : {
    unoptimized : true,
  },
  basePath: '/kopite97-blog'
};

export default nextConfig;
