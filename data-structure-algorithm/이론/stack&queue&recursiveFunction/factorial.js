function factorialIterative(n) {
  let result = 1;
  // 1부터 n까지의 수를 차례대로 곱하기
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

console.log('반복문으로 구현 : ' + factorialRecursive(5)); // 120
console.log('재귀함수로 구현 : ' + factorialIterative(5)); // 120
