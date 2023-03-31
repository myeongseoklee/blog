import { data } from './data.js';

// 재귀 함수
function binarySearchRecursive(array, target, start, end) {
  if (start > end) {
    // 시작 인덱스가 끝 인덱스보다 크면, 값이 없는 경우
    return -1;
  }
  const mid = Math.floor((start + end) / 2); // 중간 인덱스 계산
  // 중간 값이 찾는 값과 같으면, 중간 인덱스를 반환
  if (array[mid] === target) {
    return mid;
  }
  // 찾는 값이 중간 값보다 작으면, 왼쪽 하위 배열에서 다시 검색
  else if (array[mid] > target) {
    return binarySearchRecursive(array, target, start, mid - 1);
  }
  // 찾는 값이 중간 값보다 크면, 오른쪽 하위 배열에서 다시 검색
  else {
    return binarySearchRecursive(array, target, mid + 1, end);
  }
}

// 끝 인덱스 n  구하기
const end = data.length - 1;

const target = [15, 8, 1, 200];

target.forEach((item, i) => {
  let result = binarySearchRecursive(data, item, 0, end);
  if (result === -1) {
    console.log(`${target[i]} 요소가 없습니다.`);
    return;
  }
  console.log(`${target[i]} 요소는 ${result} index에 있습니다.`);
});
