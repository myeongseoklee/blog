function solution(n, fears) {
  const fearsArr = fears
    .split(' ')
    .map((item) => parseInt(item))
    .sort((a, b) => a - b);

  let result = 0;
  let count = 0;

  for (let i = 0; i < n; i++) {
    count += 1;
    if (count >= fearsArr[i]) {
      result += 1;
      count = 0;
    }
  }

  return result;
}

const n = 5;
const fears = '2 3 1 2 2';

console.time('test1');
console.log(solution(5, '2 3 1 2 2')); // 2, 3.352ms
console.timeEnd('test1');

console.time('test2');
console.log(solution(5, '5 5 1 1 1')); // 3, 0.032ms
console.timeEnd('test2');
