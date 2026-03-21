import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 정적 HTML 파일로 출력하도록 설정
  output : 'export',

  // Github Pages에서는 Next.js의 이미지 최적화 서버를 쓸 수 없으므로 비활성화
  images : {
    unoptimized : true,
  },
  basePath: '/blog',
  // 경로 끝에 /를 붙여서 정적 파일 위치를 더 확실하게 찾기
  trailingSlash: true
};

export default nextConfig;
