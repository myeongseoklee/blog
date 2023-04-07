function check(h, m, s) {
  if (
    h % 10 === 3 ||
    Math.floor(m / 10) === 3 ||
    m % 10 === 3 ||
    Math.floor(s / 10) === 3 ||
    s % 10 === 3
  )
    return true;
  return false;
}

function solution(n) {
  let counts = 0;
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j < 60; j++) {
      for (let k = 0; k < 60; k++) {
        // increment count if '3' is included in every hour
        if (check(i, j, k)) {
          counts++;
        }
      }
    }
  }
  return counts;
}

console.time('test');
console.log(solution(5));
console.timeEnd('test');
