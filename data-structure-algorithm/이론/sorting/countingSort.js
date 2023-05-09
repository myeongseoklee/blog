const goodCase = [
  10, 0, 20, 30, 50, 10, 50, 100, 100, 80, 90, 90, 40, 6010, 0, 20, 30, 50, 10,
  50, 100, 100, 80, 90, 90, 40, 6010, 0, 20, 30, 50, 10, 50, 100, 100, 80, 90,
  90, 40, 60,
];
const badCase = [0, 999999];

function countingSort(arr) {
  const max = Math.max(...arr);

  const countsArr = new Array(max + 1).fill(0);

  let result = [];

  for (let i = 0; i < arr.length; i++) {
    countsArr[arr[i]] += 1;
  }

  for (let i = 0; i < countsArr.length; i++) {
    const numString = i.toString().repeat(countsArr[i]);
    const nums = [...numString].map((el) => +el);
    result.push(...nums);
  }

  return result;
}

console.time('good case');
countingSort(goodCase);
console.timeEnd('good case'); // 3.544ms

console.time('good case in sort method');
goodCase.sort((a, b) => a - b);
console.timeEnd('good case in sort method'); // 0.019ms

console.time('bad case in counting sort');
countingSort(goodCase);
console.timeEnd('bad case in counting sort'); // 0.841ms

console.time('bad case in sort method');
badCase.sort((a, b) => a - b);
console.timeEnd('bad case in sort method'); // 0.01ms
