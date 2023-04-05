function minCoinNumbers(n, coins) {
  let count = 0;
  for (let i = 0; i < coinTypes.length; i++) {
    count += parseInt(n / coinTypes[i]);
    n %= coinTypes[i];
  }
  return count;
}

const n = 1260;
const coinTypes = [500, 100, 50, 10];
const result = minCoinNumbers(n, coinTypes);
console.log(result); // 6
