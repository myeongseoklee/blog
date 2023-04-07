function solution(n, plan) {
  let [x, y] = [1, 1];

  const plans = plan.split(' ');

  // LRUD
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  const moveTypes = ['L', 'R', 'U', 'D'];

  // move
  for (let i = 0; i < plans.length; i++) {
    let plan = plans[i];

    for (let j = 0; j < moveTypes.length; j++) {
      if (plan === moveTypes[j]) {
        let nx = x + dx[j];
        let ny = y + dy[j];

        if (nx < 1 || ny < 1 || nx > n || ny > n) {
          continue;
        }

        x = nx;
        y = ny;
        break;
      }
    }
  }
  return x + ' ' + y;
}

let n = 5;
let plan = 'R R R U D D';

console.time('test1');
console.log(solution(n, plan)); // 3.085ms
console.timeEnd('test1');
