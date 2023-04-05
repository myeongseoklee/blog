function solution(numString) {
  const numArr = [...numString];
  return numArr.reduce(
    (acc, cur) => (cur !== '0' ? (acc *= +cur) : (acc += +cur)),
    1,
  );
}

console.time('test1');
console.log(solution('02984')); // 576, 3.285ms
console.timeEnd('test1');

console.time('test2');
console.log(solution('567')); // 210, 0.032ms
console.timeEnd('test2');
