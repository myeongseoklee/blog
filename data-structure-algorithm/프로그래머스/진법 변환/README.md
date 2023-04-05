# **JavaScript 진수 변환**

프로그래머스의 [3진법 뒤집기](https://school.programmers.co.kr/learn/courses/30/lessons/68935) 문제를 풀다가 진법 변환 문제가 나와 정리한다.

### 10진수를 n진수로 변환

```js
const decimal = 100;

const ternary = decimal.toString(3); // 3진수 변환
const binary = decimal.toString(2); // 2진수 변환
const octal = decimal.toString(8);
const hex = decimal.toString(16);
```

### n진수를 10진수로 변환

```js
let decimal;
decimal = parseInt(ternary, 3);
decimal = parseInt(binary, 2);
decimal = parseInt(octal, 8);
decimal = parseInt(hex, 16);
```

n진수에서 10진수로 변환하는 방법
var binary = "1111111111";
var decimal = parseInt(binary, 2); // 2진수에서 10진수로

var octal = "1777";
var decimal = parseInt(octal, 8); // 8진수에서 10진수로

var hex = "3ff";
var decimal = parseInt(hex, 16); // 16진수에서 10진수로
parseInt({{n진수}}, n)

를 사용해 n진수를 10진수로 변환할 수 있습니다.

n진수에서 n진수로 변환 방법
위 두가지 방법을 아셨다면 이제 2진수에서 16진수로, 16진수에서 8진수로 변환 등도 쉽게 가능합니다.

var binary = "1111111111";
var hex = parseInt(binary, 2).toString(16); // 2진수에서 16진수로

var hex = "3ff";
var octal = parseInt(hex, 16).toString(8); // 16진수에서 8진수로
코드를 보시면 아시겠지만,

n진수에서 10진수로 변환 후, 다시 원하는 n 진수로 변환하는 것으로 n진수에서 n진수로 변환이 가능합니다.
