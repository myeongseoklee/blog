const graph = [
  [0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
];

const [n, m] = [4, 5];

function dfsIceCream(x, y, graph) {
  if (x < 0 || y < 0 || x > n - 1 || y > m - 1) return false;

  if (graph[x][y] === 0) {
    graph[x][y] = 1;
    dfsIceCream(x - 1, y, graph);
    dfsIceCream(x, y - 1, graph);
    dfsIceCream(x + 1, y, graph);
    dfsIceCream(x, y + 1, graph);
    return true;
  }
  return false;
}

function iceCream(n, m, graph) {
  let result = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (dfsIceCream(i, j, graph) === true) {
        result++;
      }
    }
  }

  return result;
}

console.time('test');
const result = iceCream(n, m, graph);
console.timeEnd('test');

console.log(result); // 3
