// 동빈나 솔루션
function solution(n, k) {
  let counts = 0;
  while (true) {
    counts += n % k;
    n -= n % k;

    if (n < k) break;

    n /= k;
    counts++;
  }
  counts += n - 1;
  return counts;
}

console.time('test1');
console.log(solution(21, 4)); // 4, 3.281ms
console.timeEnd('test1');

console.time('test2');
console.log(solution(17, 4)); // 3, 0.037ms
console.timeEnd('test2');

console.time('test3');
console.log(solution(25, 5)); // 2, 0.027ms
console.timeEnd('test3');

console.time('test4');
console.log(solution(9889900000, 5000000000)); // 4889900001, 0.026ms
console.timeEnd('test4');
