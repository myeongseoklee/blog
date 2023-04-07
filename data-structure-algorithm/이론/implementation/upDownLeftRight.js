'use strict';

function upDownLeftRight(n, plan) {
  // LRUD
  const LRUD = { L: 0, R: 1, U: 2, D: 3 };
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  let [x, y] = [1, 1];

  const planArr = plan.split(' ');
  for (let i = 0; i < planArr.length; i++) {
    let idx = LRUD[`${planArr[i]}`];

    let nx = x + dx[idx];
    let ny = y + dy[idx];

    if (nx < 1 || nx > n || ny < 1 || ny > n) {
      continue;
    }

    [x, y] = [nx, ny];
  }
  return `${x} ${y}`;
}

let n = 5;
let plan = 'R R R U D D';

console.time('test1');
console.log(upDownLeftRight(n, plan)); // 3.085ms
console.timeEnd('test1');
