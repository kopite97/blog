---
title: '집합의 표현'
date: '2026-04-07'
category: 'Coding-Test/Graph'
description: 'Gold5'
---

## 집합의 표현

[집합의 표현](https://www.acmicpc.net/problem/1717)

### 문제

초기에
$n+1$개의 집합
$\{0\}, \{1\}, \{2\}, \dots , \{n\}$이 있다. 여기에 합집합 연산과, 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산을 수행하려고 한다.

집합을 표현하는 프로그램을 작성하시오.

### 입력

첫째 줄에
$n$,
$m$이 주어진다.
$m$은 입력으로 주어지는 연산의 개수이다. 다음
$m$개의 줄에는 각각의 연산이 주어진다. 합집합은
$0$
$a$
$b$의 형태로 입력이 주어진다. 이는
$a$가 포함되어 있는 집합과,
$b$가 포함되어 있는 집합을 합친다는 의미이다. 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산은
$1$
$a$
$b$의 형태로 입력이 주어진다. 이는
$a$와
$b$가 같은 집합에 포함되어 있는지를 확인하는 연산이다.

### 출력

1로 시작하는 입력에 대해서
$a$와
$b$가 같은 집합에 포함되어 있으면 "YES" 또는 "yes"를, 그렇지 않다면 "NO" 또는 "no"를 한 줄에 하나씩 출력한다.

---

### 풀이

```java
import java.io.*;
import java.util.*;

public class Main {
    static int[] arr;
    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int m = Integer.parseInt(st.nextToken());

        arr = new int[n+1];

        for (int i = 0; i <= n; i++) {
            arr[i] = i;
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < m; i++) {
            st = new  StringTokenizer(br.readLine());
            int union =  Integer.parseInt(st.nextToken());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());

            if (union == 0) {
                // 합집합
                union(a,b);
            } else {
                // 확인
                sb.append(find(a) == find(b) ? "YES" : "NO").append("\n");
            }
        }
        System.out.println(sb);

    }

    static int find(int x) {
        if (arr[x] == x) {
            return x;
        }
        return arr[x] = find(arr[x]);
    }

    static void union(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);

        if (rootA != rootB) {
            if (a > b) {
                arr[rootA] = rootB;
            } else {
                arr[rootB] =  rootA;
            }
        }
    }
}
```

유니온-파인드 자료구조를 사용하는 그래프 문제.  
이 문제를 풀기 전 유니온-파인드 구조를 미리 학습하고 해서 아주 쉽게 풀었다.  
유니온 파인드 자료구조는 다른말로 서로소 집합(Disjoint Set)이라고도 부른다.

유니온 파인드 자료구조를 구현하기 위한 핵심요소는 다음과 같다.

1.  초기화
    - 처음에는 모든 노드가 자기 자신을 부모로 가리킨다.
2.  찾기 (Find)
    - 특정 노드가 속한 그룹의 `루트노드`를 찾는다.
    - 내 부모가 나 자신이 될 때까지 배열을 타고 계속 올라가도록 구현
    - 최적화하는 방법은 `경로압축`을 하는 것이다. 만약 1번->2번->3번->4번이 일렬로 연결되어 있다면, 4번의 최상단 부모를 찾기 위해 3번->2번->1번으로 거슬러 올라가는 것은 비효율적이다. 그러므로 찾기(Find)를 수행할 때, 어차피 최상단 부모는 1번인걸 알고 있으니 2번 3번 4번의 부모를 전부 1번으로 업데이트를 해준다.
3.  합치기 (Union)
    - 두 노드가 속한 그룹을 합친다.
    - A와 B를 합친다고 할 때, 단순히 A와 B를 연결하는 것이 아니라, A의 최고 부모를 찾고, B의 최고 부모를 찾아서 한쪽 부모 밑으로 다른 쪽 부모를 들어가게 한다.

> **유니온 파인드를 쓰는 경우**
>
> 1.  A와 B가 같은 네트워크(연결망)에 있는지 질문을 던질 때.
> 2.  그래프에 사이클(순환 고리)이 존재하는지 판별할 때. (간선의 양 끝 노드를 Union하려는데, 이미 Find로 부모가 같다면 사이클이 발생한 것.)
> 3.  **크루스칼 알고리즘**(최소 신장 트리) 에서 필수적인 뼈대로 사용된다.
