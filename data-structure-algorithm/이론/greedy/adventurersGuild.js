function adventurersGuild(n, fears) {
  const fearsArr = fears
    .split(' ')
    .sort((a, b) => b - a)
    .map((item) => +item);
  console.log('fearsArr: ', fearsArr);

  let idx = 0;
  let groupCounts = 0;
  while (n > 0) {
    groupCounts += 1; // group을 만들 탐험가가 남아있다면 group 수 증가 시키기
    n -= fearsArr[idx]; // 공포도 크기 만큼 group에 탐험가 할당
    console.log('n: ', n);
    idx += fearsArr[idx]; // 다음 그룹을 시작 할 index 설정
  }

  return groupCounts;
}

console.time('test');
console.log(adventurersGuild(5, '2 3 1 2 2')); // 2, 3.702ms
console.timeEnd('test');

console.time('test2');
console.log(adventurersGuild(5, '5 5 1 1 1')); // 1, 0.032ms
console.timeEnd('test2');
