function solution(str) {
  let stringArr = [];
  let number = 0;

  // check each character
  for (let i = 0; i < str.length; i++) {
    let x = str[i];
    // If alphabetic, insert into result list
    if (x.match(/[a-zA-Z]/)) {
      stringArr.push(x);
    } else {
      number += parseInt(x);
    }
  }
  const string = stringArr.sort().join('');

  // If at least one number exists, insert it at the end and Return
  return number !== 0 ? string + number : string;
}

let string = 'K1KA5CB7';
console.time('test1');
console.log(solution(string)); // ABCKK13
console.timeEnd('test1');

string = 'AJKDLSI412K4JSJ9D';
console.time('test2');
console.log(solution(string)); // ADDIJJJKKLSS20
console.timeEnd('test2');
