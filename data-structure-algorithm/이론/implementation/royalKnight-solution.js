function royalKnight(coordinate) {
  let [x, y] = coordinate.split('');
  const stringX = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
  [x, y] = [stringX[x], +y];

  const moveTypes = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
    [-1, -2],
    [1, -2],
    [-1, 2],
    [1, 2],
  ];

  let counts = 0;
  for (let i = 0; i < moveTypes.length; i++) {
    let step = moveTypes[i];
    let nx = x + step[1];
    let ny = y + step[0];

    if (nx < 1 || ny < 1 || nx > 8 || ny > 8) {
      continue;
    }
    counts++;
  }
  return counts;
}

let coordinate = 'a1';
console.time('test1');
console.log(royalKnight(coordinate)); // 2
console.timeEnd('test1');

coordinate = 'c2';
console.time('test2');
console.log(royalKnight(coordinate)); // 6
console.timeEnd('test2');
