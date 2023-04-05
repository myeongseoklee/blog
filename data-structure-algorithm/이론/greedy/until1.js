// 나의 풀이
function minCalculationNumbers(n, k) {
  let counts = 0;
  while (n > 1) {
    if (n >= k && n % k === 0) {
      n /= k;
      counts++;
      continue;
    } else {
      n--;
      counts++;
      continue;
    }
  }
  return counts;
}

console.time('test1');
console.log(minCalculationNumbers(21, 4));
console.timeEnd('test1');
console.time('test2');
console.log(minCalculationNumbers(17, 4));
console.timeEnd('test2');
console.time('test3');
console.log(minCalculationNumbers(25, 5));
console.timeEnd('test3');
console.time('test4');
console.log(minCalculationNumbers(9889900000, 5000000000));
console.timeEnd('test4');

function solution(n, k) {}
