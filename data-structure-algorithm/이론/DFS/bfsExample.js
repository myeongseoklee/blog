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

bfs(graph, 1, visited);
