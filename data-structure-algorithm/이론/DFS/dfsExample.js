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

function dfs(graph, idx, visited) {
  visited[idx] = true;
  console.log(idx);

  for (const node of graph[idx]) {
    if (!visited[node]) dfs(graph, node, visited);
  }
}

dfs(graph, 1, visited); // 1 2 7 6 8 3 4 5
