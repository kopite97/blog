---
title: '프로그래머스 섬 연결하기'
date: '2026-04-08'
category: 'Coding-Test'
description: 'Level3'
---

## 섬 연결하기

[섬 연결하기](https://school.programmers.co.kr/learn/courses/30/lessons/42861)

### 문제 설명

n개의 섬 사이에 다리를 건설하는 비용(costs)이 주어질 때, 최소의 비용으로 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용을 return 하도록 solution을 완성하세요.

다리를 여러 번 건너더라도, 도달할 수만 있으면 통행 가능하다고 봅니다. 예를 들어 A 섬과 B 섬 사이에 다리가 있고, B 섬과 C 섬 사이에 다리가 있으면 A 섬과 C 섬은 서로 통행 가능합니다.

### 제한 사항

- 섬의 개수 n은 1 이상 100 이하입니다.
- costs의 길이는 ((n-1) \* n) / 2이하입니다.
- 임의의 i에 대해, costs[i][0] 와 costs[i] [1]에는 다리가 연결되는 두 - 섬의 번호가 들어있고, costs[i] [2]에는 이 두 섬을 연결하는 다리를 건설할 때 드는 비용입니다.
- 같은 연결은 두 번 주어지지 않습니다. 또한 순서가 바뀌더라도 같은 연결로 봅니다. 즉 0과 1 사이를 연결하는 비용이 주어졌을 때, 1과 0의 비용이 주어지지 않습니다.
- 모든 섬 사이의 다리 건설 비용이 주어지지 않습니다. 이 경우, 두 섬 사이의 건설이 불가능한 것으로 봅니다.
- 연결할 수 없는 섬은 주어지지 않습니다.

---

### 풀이

> **Prim 알고리즘**

```java
import java.util.*;
class Solution {
    static ArrayList<Node>[] graph;
    static boolean[] visited;
    static int Distance;
    public int solution(int n, int[][] costs) {
        int answer = 0;

        graph = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int i = 0; i < costs.length; i++) {
            int a = costs[i][0];
            int b = costs[i][1];
            int weight =  costs[i][2];

            graph[a].add(new Node(b, weight));
            graph[b].add(new Node(a, weight));
        }

        visited = new boolean[n];
        Distance = 0;
        prim(0);

        return Distance;
    }

    void prim (int start) {

        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.offer(new Node(start, 0));


        while(!pq.isEmpty()) {
            Node current = pq.poll();
            int currentNode = current.v;
            int currentWeight = current.w;
            if(visited[currentNode]) continue;
            visited[currentNode] = true;
            Distance += currentWeight;


            for( Node next : graph[currentNode]) {
                if (!visited[next.v]) {

                    pq.offer(new Node(next.v, next.w));
                }
            }
        }
    }

    class Node implements Comparable<Node> {
        int v;
        int w;
        public Node(int v, int w) {
            this.v = v;
            this.w = w;
        }

        @Override
        public int compareTo(Node o) {
            return Integer.compare(this.w, o.w);
        }

    }
}
```

> **Kruskal 알고리즘**

```java
import java.util.*;
class Solution {
    static int[] parent;
    public int solution(int n, int[][] costs) {
        int answer = 0;
        parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }

        Arrays.sort(costs,(a,b)->a[2]-b[2]);

        for (int i = 0; i < costs.length; i++) {
            int a = costs[i][0];
            int b = costs[i][1];
            int weight =  costs[i][2];

            if(find(a) != find(b)){
                union(a,b);
                answer +=  weight;
            }
        }

        return answer;
    }

    int find(int x) {
        if (parent[x] == x) {
            return x;
        }

        return parent[x] = find(parent[x]);
    }

    void union(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);
        parent[rootA] = rootB;
    }
}
```

프림 알고리즘과 크루스칼 알고리즘 두 가지로 풀 수 있는 문제.

프림은 다익스트라와 유사하고, 크루스칼은 유니온-파인드를 사용하는 알고리즘이다.

> 프림 vs 다익스트라
>
> 목표
>
> - 다익스트라 : 시작점에서 특정 노드까지 가는 개별 최단 경로 찾기
> - 프림 : 모든 노드를 연결하는 전체 최소 비용 찾기
>
> ---
>
> 큐 정렬 기준
>
> - 다익스트라 : 시작점부터의 총 누적 거리
> - 프림 : 현재 노드에서 뻗어나가는 간선 하나만의 비용

> 크루스칼과 유니온 파인드
>
> - 크루스칼 알고리즘은 유니온 파인드를 사용하여 구현되는 알고리즘.

프림과 크루스칼 모두 이 문제의 핵심인 최소 신장 트리(MST)를 구현하는데 쓰인다. 간선이 적은 희소 그래프에서는 크루스칼, 간선이 많은 밀집 그래프에서는 프림 알고리즘이 유리하다.
