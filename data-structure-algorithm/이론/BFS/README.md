# **BFS(Breadth-First Search)**

- BFS는 너비 우선 탐색이라고도 부르며, 그래프에서 가까운 노드부터 우선적으로 탐색하는 알고리즘이다.
- BFS는 큐 자료구조를 이용하며 구체적인 동작과정은 다음과 같다.
  1. 탐색 시작 노드를 큐에 삽입하고 방문 처리를 한다.
  2. 큐에서 노드를 꺼낸 뒤에 해당 노드의 인접 노드 중에서 방문하지 않은 노드를 모두 큐에 삽입하고 방문 처리한다.
  3. 더 이상 2번의 과정을 수행할 수 없을 때 까지 반복한다.

```js
const graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];

const visited = [false, false, false, false, false, false, false, false, false];

function bfs(graph, start, visited) {
  const queue = [start];

  visited[start] = true;

  while (queue.length > 0) {
    let node = queue.shift();
    console.log(node);

    for (const idx of graph[node]) {
      if (!visited[idx]) {
        queue.push(idx);
        visited[idx] = true;
      }
    }
  }
}

bfs(graph, 1, visited); // 1 2 3 8 7 4 5 6
```

---

> 출처 : [(이코테 2021 강의 몰아보기) 3. DFS/BFS](https://youtu.be/7C9RgOcvkvo)
