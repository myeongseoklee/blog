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

decimal = parseInt(ternary, 3); // 3진수를 10진수로 변환
decimal = parseInt(binary, 2); // 2진수를 10진수로 변환
decimal = parseInt(octal, 8);
decimal = parseInt(hex, 16);
```

### n진수에서 m진수 변환

n진수를 10진수로 바꾼 후(parseInt) m진수로 변환(toString)하면 된다.

```js
const quintal = parseInt(ternary, 3).toString(5); // 3진수를 5진수로 변환
const hexadecimal = parseInt(octal, 8).toString(6); // 8진수를 6진수로 변환
```
