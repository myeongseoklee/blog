const array = [8, 9, 5, 7, 0, 3, 1, 6, 2, 4];

function pivot(arr, start = 0, end = arr.length - 1) {
  let pivot = arr[start];
  let swapIdx = start;
}

function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return;

  let pivot = start;
  let left = start + 1;
  let right = end;

  while (left <= right) {
    // 피벗보다 큰 데이터를 찾을 때 까지 반복
    while (left <= end && arr[left] <= arr[pivot]) left++;

    // 피벗보다 작은 데이터를 찾을 때 까지 반복
    while (right > start && arr[right] >= arr[pivot]) right--;

    // 엇갈렸다면 작은 데이터와 피벗을 교체
    if (left > right) {
      [arr[pivot], arr[right]] = [arr[right], arr[pivot]];
      pivot = right;
    } else {
      // 엇갈리지 않았다면 작은 데이터와 큰 데이터를 교체
      [arr[left], arr[right]] = [arr[right], arr[left]];
    }
  }

  // 분할 이후 pivot의 왼쪽 부분과 오른쪽 부분에서 각각 quickSort 재귀적으로 수행
  quickSort(arr, start, pivot - 1);
  quickSort(arr, pivot + 1, end);
}

console.time('test');
quickSort(array);
console.timeEnd('test'); // 0.087ms
