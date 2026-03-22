import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  // 정적 HTML 파일로 출력하도록 설정
  output: 'export',

  images: {
    unoptimized: true,
  },
  basePath: '/blog',
  assetPrefix: '/blog', // Js나 css같은거 경로 앞에 /blog붙임

  trailingSlash: true, // 경로 끝에 /를 붙여서 정적 파일 위치를 더 확실하게 찾기
};

export default nextConfig;
