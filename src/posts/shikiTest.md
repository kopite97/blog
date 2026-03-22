---
title: 'Shiki 하이라이트 테스트'
date: '2026-03-22'
category: 'Develop'
description: '코드 블록이 어떻게 변하나...'
---

### TypeScript 에시

```typescript
const greeting: string = 'Hello World';
function welcome(name: string) {
  console.log(`${greeting} Welcome to world.`);
}
```

```csharp
public class PlayerController : MonoBehavior {
    void Update(){
        float move = Input.GetAxis("Horizontal");
        transform.Translate(Vector3.right * move * Time.deltaTime);
    }
}

```

### 2. 자동 목차(ToC) 생성 기능 구현하기

본문의 `h2`, `h3` 태그를 자동으로 일거와 우측 사이드바에 뿌려주는 기능 만들기

#### **1. 필요한 패키지 설치**

제목에 고유 ID를 붙여주는 `rehype-slug`가 반드시 필요 (클릭 시 해당 위치로 이동하기 위해)

```bash
npm install rehype-slug
```
