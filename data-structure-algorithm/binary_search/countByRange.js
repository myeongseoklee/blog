function binarySearchForLoop(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  let idxDiff = end - start;
  while (idxDiff >= 0) {
    let centerIdx = Math.floor((end + start) / 2);
    let centerVal = arr[centerIdx];

    if (target === centerVal) {
      return centerIdx;
    }

    if (centerVal < target) {
      start = centerIdx + 1;
    } else {
      end = centerIdx - 1;
    }

    idxDiff = end - start;
  }

  return -1;
}

function countByRange(nums, start, end) {
  nums.sort((a, b) => a - b);
  const startIndex = binarySearchForLoop(nums, start);
  const endIndex = binarySearchForLoop(nums, end);

  return endIndex - startIndex;
}

const arr = [1, 2, 3, 3, 3, 3, 4, 4, 5, 6, 7, 8, 9];
console.log(countByRange(arr, 3, 7)); // 8
