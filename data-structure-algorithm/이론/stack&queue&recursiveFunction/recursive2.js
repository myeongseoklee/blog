function recursiveFunction2(counts) {
  // 5번째 호출을 했을 때 종료되도록 종료 조건 명시
  if (counts === 5) return;
  console.log(
    counts,
    '번째 재귀 함수에서',
    counts + 1,
    '번째 재귀함수를 호출합니다.',
  );
  recursiveFunction2(counts + 1);
  console.log(counts + '번째 재귀함수를 종료합니다.');
}

recursiveFunction2(1);
// 1 번째 재귀 함수에서 2 번째 재귀함수를 호출합니다.
// 2 번째 재귀 함수에서 3 번째 재귀함수를 호출합니다.
// 3 번째 재귀 함수에서 4 번째 재귀함수를 호출합니다.
// 4 번째 재귀 함수에서 5 번째 재귀함수를 호출합니다.
// 4번째 재귀함수를 종료합니다.
// 3번째 재귀함수를 종료합니다.
// 2번째 재귀함수를 종료합니다.
// 1번째 재귀함수를 종료합니다.
