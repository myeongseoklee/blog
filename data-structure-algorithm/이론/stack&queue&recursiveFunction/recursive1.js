function recursiveFunction1() {
  console.log('재귀 함수를 호출합니다.');
  recursiveFunction1();
}

recursiveFunction1(); // RangeError: Maximum call stack size exceeded
