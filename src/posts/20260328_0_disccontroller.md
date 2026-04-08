---
title: '디스크 컨트롤러'
date: '2026-03-28'
category: 'Coding-Test/Heap'
description: 'Level 3'
---

## 디스크 컨트롤러

[디스크 컨트롤러](https://school.programmers.co.kr/learn/courses/30/lessons/42627)

### 문제 설명

하드디스크는 한 번에 하나의 작업만 수행할 수 있습니다. 디스크 컨트롤러를 구현하는 방법은 여러 가지가 있습니다. 이 문제에서는 우선순위 디스크 컨트롤러라는 가상의 장치를 이용한다고 가정합니다. 우선순위 디스크 컨트롤러는 다음과 같이 동작합니다.

1.  어떤 작업 요청이 들어왔을 때 작업의 번호, 작업의 요청 시각, 작업의 소요 시간을 저장해 두는 대기 큐가 있습니다. 처음에 이 큐는 비어있습니다.
2.  디스크 컨트롤러는 하드디스크가 작업을 하고 있지 않고 대기 큐가 비어있지 않다면 가장 우선순위가 높은 작업을 대기 큐에서 꺼내서 하드디스크에 그 작업을 시킵니다. 이때, 작업의 소요시간이 짧은 것, 작업의 요청 시각이 빠른 것, 작업의 번호가 작은 것 순으로 우선순위가 높습니다.
3.  하드디스크는 작업을 한 번 시작하면 작업을 마칠 때까지 그 작업만 수행합니다.
4.  하드디스크가 어떤 작업을 마치는 시점과 다른 작업 요청이 들어오는 시점이 겹친다면 하드디스크가 작업을 마치자마자 디스크 컨트롤러는 요청이 들어온 작업을 대기 큐에 저장한 뒤 우선순위가 높은 작업을 대기 큐에서 꺼내서 하드디스크에 그 작업을 시킵니다. 또, 하드디스크가 어떤 작업을 마치는 시점에 다른 작업이 들어오지 않더라도 그 작업을 마치자마자 또 다른 작업을 시작할 수 있습니다. 이 과정에서 걸리는 시간은 없다고 가정합니다.

각 작업에 대해 [작업이 요청되는 시점, 작업의 소요시간]을 담은 2차원 정수 배열 jobs가 매개변수로 주어질 때, 우선순위 디스크 컨트롤러가 이 작업을 처리했을 때 모든 요청 작업의 반환 시간의 평균의 정수부분을 return 하는 solution 함수를 작성해 주세요.

### 제한 사항

- 1 ≤ jobs의 길이 ≤ 500
- jobs[i]는 i번 작업에 대한 정보이고 [s, l] 형태입니다.
  - s는 작업이 요청되는 시점이며 0 ≤ s ≤ 1,000입니다.
  - l은 작업의 소요시간이며 1 ≤ l ≤ 1,000입니다.

---

### 풀이

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;
class Solution {
    public int solution(int[][] jobs) {
        int answer = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) ->{

            int startTimeA = a[0];
            int StartTimeB = b[0];
            int processingTimeA = a[1];
            int processingTimeB = b[1];
            int processingNumberA = a[2];
            int processingNumberB = b[2];

            // 1. 작업의 소요시간이 짧은 것.
            if(processingTimeA != processingTimeB){
                return processingTimeA -   processingTimeB;
            }

            // 2. 작업의 요청 시각이 빠른 것.

            if(startTimeA != StartTimeB){
                return startTimeA - StartTimeB;
            }

            // 3. 작업의 번호가 작은 것.

            return  processingNumberA - processingNumberB;
        });

        int[][] newJobs = new int[jobs.length][3];
        for (int i = 0; i < jobs.length; i++) {
            newJobs[i][0] = jobs[i][0];
            newJobs[i][1] = jobs[i][1];
            newJobs[i][2] = i;
        }

        Arrays.sort(newJobs, Comparator.comparingInt(a -> a[0]));


        int jobIndex = 0;
        int time = 0;
        int count = 0;

        while(count < jobs.length){
            while ( jobIndex <= newJobs.length - 1 && time >= newJobs[jobIndex][0]) {
                pq.add(newJobs[jobIndex++]);
            }

            if (pq.isEmpty() && jobIndex <= newJobs.length - 1) {
                time = newJobs[jobIndex][0];
                continue;
            }

            int[] currentJob = pq.poll();
            time += currentJob[1];
            int returnTime = time -  currentJob[0];
            answer += returnTime;
            count++;

        }

        return answer / jobs.length;
    }
}
```

이번 문제는 바로 PriorityQueue를 사용해서 풀었다. `그리디 + 힙` 종류의 문제였는데, 사소한 실수 때문에 몇분을 잡아먹었는지...

```java
 while ( jobIndex <= newJobs.length - 1 && time >= newJobs[jobIndex][0]) {
                pq.add(newJobs[jobIndex++]);
            }

```

While문 안에서 이중 반복문으로 존재하는 저 While의 조건의 앞뒤를 바꿨더니 계속 `ArrayIndexOutOfBoundsException`이 발생했다.
나는 또 로직을 이상하게 짠 줄 알았는데, 조건문 하나가 딱 에러 발생하기 좋게 작성해서 이상한데서 시간을 꽤 날렸다. 당연히 저 조건식의 앞뒤를 바꿔서

```java
time >= newJobs[jobIndex]
```

위의 코드를 바로 해버리면 인덱스 초과 에러가 날 만도 하지...
정말 힙 몇번 풀었다고 대충대충 풀다가 한번 더 혼나고 간다....
