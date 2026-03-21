// app/page.tsx
import Link from 'next/link';
import { getSortedPostsData } from '@/src/lib/posts';

export default function Home() {
  // 1. 모든 글의 데이터를 가져온다.
  const allPostsData = getSortedPostsData();

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>개발 블로그</h1>
        <p style={{ color: 'gray' }}>꾸준한 기록이 최고의 포트폴리오가 된다.</p>
      </header>
      
      {/* 2. 가져온 데이터 배열을 map() 함수로 돌면서 리스트 생성 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {allPostsData.map(({ id, date, title, description }) => (
          <li key={id} style={{ marginBottom: '2rem' }}>
            {/* Next.js의 핵심: 페이지 이동 시 새로고침 없이 빠르게 넘어가게 해주는 Link 컴포넌트 */}
            <Link 
              href={`/posts/${id}`} 
              style={{ textDecoration: 'none', color: '#0070f3', fontSize: '1.5rem', fontWeight: 'bold' }}
            >
              {title}
            </Link>
            <br />
            <small style={{ color: 'gray', display: 'block', marginTop: '0.5rem' }}>{date}</small>
            {description && <p style={{ marginTop: '0.5rem' }}>{description}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}