function time(n) {
  let counts = 0;
  const Three = '3';
  for (let h = 0; h <= n; h++) {
    for (let m = 0; m < 60; m++) {
      for (let s = 0; s < 60; s++) {
        let time = `${h}${m}${s}`;
        const isThreeInclude = time.includes(Three);
        if (isThreeInclude) counts++;
      }
    }
  }
  return counts;
}

console.time('test');
console.log(time(5)); // 6.381ms
console.timeEnd('test');
