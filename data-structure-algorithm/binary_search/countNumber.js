function findLeft(arr, target, start = 0, end = arr.length - 1) {
  let mid = Math.floor((start + end) / 2);

  if (target < arr[mid]) {
    return findLeft(arr, target, start, mid - 1);
  }

  if (arr[mid] < target) {
    return findLeft(arr, target, mid + 1, end);
  }

  if (arr[mid] === target) {
    return arr[mid - 1] === target ? findLeft(arr, target, 0, mid - 1) : mid;
  }

  return -1;
}

function findRight(arr, target, start = 0, end = arr.length - 1) {
  let mid = Math.floor((start + end) / 2);

  if (target < arr[mid]) {
    return findRight(arr, target, start, mid - 1);
  }

  if (arr[mid] < target) {
    return findRight(arr, target, mid + 1, end);
  }

  if (arr[mid] === target) {
    return arr[mid + 1] === target
      ? findRight(arr, target, mid + 1, arr.length - 1)
      : mid;
  }

  return -1;
}

function countNumber(arr, target) {
  let end = arr.length - 1;
  let start = 0;

  const leftIdx = findLeft(arr, target, start, end); // 2
  const rightIdx = findRight(arr, target, start, end); // 5

  return rightIdx - leftIdx;
}

const arr = [1, 1, 2, 2, 2, 2, 3];
console.log(countNumber(arr, 2)); // 3
