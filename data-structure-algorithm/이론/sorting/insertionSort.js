const array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      } else {
        break;
      }
    }
  }
  return arr;
}

console.time('test');
insertionSort(array); // 0 1 2 3 4 5 6 7 8 9
console.timeEnd('test'); //0.094ms
