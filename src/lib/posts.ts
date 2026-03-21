import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';

// 1. posts 폴더의 절대 경로 설정

const postsDirectory = path.join(process.cwd(),'src','posts');

// 2. 특정 마크다운 파일의 데이터를 가져오고 HTML로 변환하는 함수
export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    //gray-matter를 사용해 마크다운의 메타데이터(프론트매터) 파싱
    const matterResult = matter(fileContents);

    // reamrk를 사용해 마크다운 브라우저가 읽을 수 있는 HTML로 변경
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

    const contentHtml = processedContent.toString();

    // 변환된 데이터 저장
    return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; description?: string }),
  };
}

export function getSortedPostsData() {
  // 1. posts 폴더 안의 모든 파일 이름을 읽어온다.. (예: ['hello-world.md'])
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames.map((fileName) => {
    // 2. 파일 이름에서 '.md' 확장자를 제거해 id를 만든다. (예: 'hello-world')
    const id = fileName.replace(/\.md$/, '');

    // 3. 마크다운 파일을 읽어온다.
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 4. gray-matter로 프론트매터(제목, 날짜 등)를 파싱
    const matterResult = matter(fileContents);

    // 5. id와 데이터를 합쳐서 반환
    return {
      id,
      ...(matterResult.data as { title: string; date: string; description?: string }),
    };
  });

  // 6. 날짜를 기준으로 최신 글이 맨 위에 오도록 내림차순 정렬
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // 파일 이름들 배열을 map으로 돌면서 Next.js가 원하는 형태의 객체 배열로 바꾼다.
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ''), // '.md' 글자 떼어내기
    };
  });
  // 결과물 예시: [ { id: 'hello-world' }, { id: 'threejs-study' } ]
}