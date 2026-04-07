---
tite: '최단 경로'
date: '2026-04-07'
category: 'Coding-test'
description: ' Gold4'
---

## 최단 경로

[최단 경로](https://www.acmicpc.net/problem/1753)

### 문제

방향그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오. 단, 모든 간선의 가중치는 10 이하의 자연수이다.

### 입력

첫째 줄에 정점의 개수 V와 간선의 개수 E가 주어진다. (1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000) 모든 정점에는 1부터 V까지 번호가 매겨져 있다고 가정한다. 둘째 줄에는 시작 정점의 번호 K(1 ≤ K ≤ V)가 주어진다. 셋째 줄부터 E개의 줄에 걸쳐 각 간선을 나타내는 세 개의 정수 (u, v, w)가 순서대로 주어진다. 이는 u에서 v로 가는 가중치 w인 간선이 존재한다는 뜻이다. u와 v는 서로 다르며 w는 10 이하의 자연수이다. 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.

### 출력

첫째 줄부터 V개의 줄에 걸쳐, i번째 줄에 i번 정점으로의 최단 경로의 경로값을 출력한다. 시작점 자신은 0으로 출력하고, 경로가 존재하지 않는 경우에는 INF를 출력하면 된다.

---

### 풀이

```java

import java.io.*;
import java.util.*;

public class Main {
    static ArrayList<Node>[] graph;
    static int[] dist;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        StringTokenizer st = new StringTokenizer(br.readLine());

        int v = Integer.parseInt(st.nextToken());
        int e = Integer.parseInt(st.nextToken());

        int root = Integer.parseInt(br.readLine());

        graph = new  ArrayList[v+1];
        for (int i = 1; i <= v; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int i = 0; i < e; i++) {
            st = new StringTokenizer(br.readLine());
            int u =  Integer.parseInt(st.nextToken());
            int m = Integer.parseInt(st.nextToken());
            int w = Integer.parseInt(st.nextToken());

            graph[u].add(new Node(v, m));
        }
        dist = new int[v+1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dijkstra(root);

        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= v; i++) {
            if (dist[i] == Integer.MAX_VALUE) {
                sb.append("INF").append("\n");
            } else {
                sb.append(dist[i]).append("\n");
            }
        }
        System.out.println(sb);
    }

    static void dijkstra(int x) {
        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.offer(new Node(x, 0)); // 시작지점
        dist[x] = 0;

        while(!pq.isEmpty()) {
            Node current = pq.poll();
            int currentNode = current.to;
            int currentWeight = current.weight;
            if(dist[currentNode] < currentWeight) continue;

            for (Node next : graph[currentNode]) {
                int nextWeight = next.weight + currentWeight;
                if (nextWeight < dist[next.to]) {
                    dist[next.to] = nextWeight;
                    pq.offer(new Node(next.to, nextWeight));
                }
            }
        }
    }

    static class Node implements Comparable<Node> {
        int to;
        int weight;

        public Node(int to, int weight){
            this.to = to;
            this.weight = weight;
        }

        @Override
        public int compareTo(Node o) {
            return this.weight - o.weight;
        }
    }
}

```

다익스트라 알고리즘 문제.

> **다익스트라 알고리즘**  
> 현재까지 알고 있는 가장 짧은 길을 먼저 선택해서, 그 길을 거쳐 가는 새로운 경로들을 탐색하는 알고리즘

#### 동작 과정

1.  초기화 : 출발점의 거리는 `0`으로, 나머지 모든 노드까지의 거리는 무한대로 설정한 배열 생성 -> `dist`배열
2.  출발 : 우선순위 큐에 `시작 지점`을 넣는다.
3.  가장 가까운 곳 방문 (poll) : 큐에서 거리가 가장 짧은 노드를 꺼낸다. (이미 더 짧은 경로로 방문한 적이 있는 노드라면 무시) -> 우선순위 큐를 이용해 구현하기 때문에, 큐에서 꺼낸 값이 최소값
4.  주변 탐색 및 업데이트 : 꺼낸 노드와 연결된 이웃 노드들을 확인
    - 계산 공식 : (현재 노드까지 온 거리) + (이웃 노드로 가는 거리)
    - 이 계산된 값이 기존 `dist`배열에 적혀있던 이웃 노드의 거리보다 짧다면 `dist`배열의 값을 갱신하고, 큐에 새롭게 (새로운 거리, 이웃 노드)를 넣어준다.
5.  종료 : 우선순위 큐가 텅 빌때까지 과정을 반복

다익스트라 알고리즘은 본질적으로 **가중치가 있는** BFS 이다.  
일반 BFS는 모든 간선의 거리가 1이라고 가정하고 큐를 사용하여 가까운 순서대로 탐색하지만 다익스트라는 간선마다 가중치가(거리가) 다르기 때문에, 일반 큐 대신 우선순위 큐를 사용해 거리가 가장 짧은 노드부터 먼저 탐색하도록 순서를 보정해 주는 BFS이다.
