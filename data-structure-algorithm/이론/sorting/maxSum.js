function maxSum(a, b, k) {
  const ascendA = a.sort((a, b) => a - b);
  const descendB = b.sort((a, b) => b - a);

  for (let i = 0; i < k; i++) {
    if (ascendA[i] < descendB[i]) ascendA[i] = descendB[i];
  }

  return ascendA.reduce((pre, cur) => (cur += pre));
}

const a = [1, 2, 5, 4, 3];
const b = [5, 5, 6, 6, 5];
const k = 3;

console.time('test');
const result = maxSum(a, b, k);
console.timeEnd('test'); // 0.056ms
