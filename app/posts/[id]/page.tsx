import { getPostData, getAllPostIds } from "@/src/lib/posts";

// 1. Github Pages(정적 호스팅)을 위한 필수 함수
// 빌드할 때 어떤 페이지들을 미리 만들어두어야 하는지 Next.js에게 알려준다.
export async function generateStaticParams(){
  return getAllPostIds();
}


// 1. params의 타입을 Promise로 감싸준다.
export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  // 2. params 객체 자체를 await로 먼저 풀어줌
  const resolvedParams = await params;
  
  // 3. 안전하게 id 꺼내기
  const postData = await getPostData(resolvedParams.id);

  return (
    <article style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{postData.title}</h1>
      <p style={{ color: 'gray' }}>{postData.date}</p>
      <hr style={{ margin: '20px 0' }} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}