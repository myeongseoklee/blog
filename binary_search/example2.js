import { heightOfRiceCake } from './data.js';

function sol(arr, m) {
  // Set start and end points for binary search
  let start = 0;
  let end = Math.max(...arr);

  // Perform binary search (recursive)
  let result = 0;
  while (start <= end) {
    let total = 0;
    let mid = Math.floor((start + end) / 2);
    for (let i = 0; i < arr.length; i++) {
      let x = arr[i];
      // Calculate the amount of tteokbokki when cut
      if (x > mid) {
        total += x - mid;
      }
    }
    // If the amount of tteokbokki is insufficient, cut more (search for the right part)
    if (total < m) {
      end = mid - 1;
    }
    // Cut less if the amount of tteokbokki is sufficient (search for the left part)
    else {
      result = mid; // Since cutting as little as possible is the correct answer, record it here in result
      start = mid + 1;
    }
  }
  return result;
}

// 실행시간 : 4.657
console.time('sol');
console.log('sol : ', sol(heightOfRiceCake, 1230));
console.timeEnd('sol');

function binarySearchForExample2(arr, m) {
  // 오름차순 정렬
  arr.sort((a, b) => a - b);

  let start = 0;
  let end = Math.max(...arr);
  let result;
  // h를 바이너리 서치로 임의로 정해준다.
  while (start <= end) {
    let sum = 0;
    let mid = Math.floor((start + end) / 2);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > mid) {
        sum += arr[i] - mid;
      }
    }
    if (sum < m) {
      end = mid - 1;
      continue;
    } else if (sum >= m) {
      result = mid;
      start = mid + 1;
    }
  }

  return result;
}

// 실행시간 : 2.416ms
console.time('binarySearchForExample2');
console.log(
  'binarySearchForExample2 : ',
  binarySearchForExample2(heightOfRiceCake, 1230),
);
console.timeEnd('binarySearchForExample2');

function simpleSolution(arr, m) {
  // h 보다 큰 요소만 1씩 뺐을때 요소들의 합이 m임 근데, h의 최댓값은 가장 큰 떡의 길이에 해당한다.
  // 가장 큰 떡의 길이에서 1씩 계속 빼주면서 원하는 m 값이 최초 등장할 때의 h를 리턴한다.

  // 내림차순 정렬
  arr.sort((a, b) => b - a);
  let end = arr.length - 1;
  let target;

  // h 최대값 도출
  for (let i = 1; i <= arr[0]; i++) {
    target = arr[0] - i;
    let result = arr
      .filter((item) => item > target)
      .map((item) => item - target)
      .reduce((acc, cur) => (acc += cur));
    // console.log('result: ', result);
    if (result >= m) {
      return target;
    }
  }
  return target;
}

// 실행시간 0.655ms
console.time('simpleSolution');
console.log('simpleSolution : ', simpleSolution(heightOfRiceCake, 1230));
console.timeEnd('simpleSolution');
