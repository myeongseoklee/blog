function rearrangeString(str) {
  const stringArr = [...str].sort();
  let stringStartIdx = 0;
  for (let i = 0; i < stringArr.length; i++) {
    if (isNaN(stringArr[i])) {
      stringStartIdx = i;
      break;
    }
  }
  const string = stringArr.slice(stringStartIdx).join('');

  let numberSum = 0;
  for (let i = 0; i < stringStartIdx; i++) {
    numberSum += +stringArr[i];
  }

  return string + numberSum;
}

let string = 'K1KA5CB7';
console.time('test1');
console.log(rearrangeString(string)); // ABCKK13
console.timeEnd('test1');

string = 'AJKDLSI412K4JSJ9D';
console.time('test2');
console.log(rearrangeString(string)); // ADDIJJJKKLSS20
console.timeEnd('test2');
