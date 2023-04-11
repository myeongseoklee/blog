# **Stack / Queue / Recursive function**

- 탐색(Search)이란 많은 양의 데이터 중에서 원하는 데이터를 찾는 과정을 말한다.
- 대표적인 그래프 탐색 알고리즘으로는 DFS와 BFS가 있다.
- DFS/BFS는 코딩 테스트에서 매우 자주 등장하는 유형!!
- DFS/BFS 알고리즘을 학습하기 전 반드시 알아야 할 개념으로 스택, 큐 자료구조와 재귀함수가 있다.

### [스택](https://growth-msleeffice.tistory.com/97)

- 먼저 들어온 데이터가 나중에 나가는 형식(선입후출)의 자료구조
- 데이터를 집어 넣는 push, 데이터를 추출하는 pop, 가장 나중에 삽입된 데이터를 확인하는 peek등의 작업을 할 수 있다.
- 함수 실행 콘텍스트들이 쌓이는 Call stack과 브라우저의 방문 기록이 쌓이는 History stack이 대표적이다.

```js
class Stack {
  constructor() {
    this.arr = [];
  }

  push(item) {
    this.arr.push(item);
  }

  pop() {
    return this.arr.pop();
  }

  peek() {
    if (this.size() === 0) null;
    return this.arr[this.arr.length - 1];
  }

  size() {
    return this.arr.length;
  }

  isEmpty() {
    return this.size() === 0;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

let lastPush = stack.peek();
console.log('lastPush: ', lastPush); // 4

const extract = stack.pop();
console.log('extract: ', extract); // 4

lastPush = stack.peek();
console.log('lastPush: ', lastPush); // 3

const size = stack.size();
console.log('size: ', size);

// 후입선출
while (!stack.isEmpty()) {
  console.log(stack.peek()); // 3, 2, 1
  stack.pop();
}
```

### [큐](https://growth-msleeffice.tistory.com/98)

- 먼저 들어온 데이터가 먼저 나가는 형식(선입선출)의 자료구조
- 데이터를 집어 넣는 enqueue, 데이터를 추출하는 dequeue등의 작업을 할 수 있다.
- 큐는 순서대로 처리해야 하는 작업을 임시로 저장해두는 버퍼(buffer)로서 많이 사용된다.

```js
class Queue {
  constructor() {
    this.arr = [];
  }

  enqueue(item) {
    this.arr.push(item);
  }

  dequeue() {
    return this.arr.shift();
  }

  peek() {
    return this.arr[0];
  }

  size() {
    return this.arr.length;
  }

  isEmpty() {
    return this.size() === 0;
  }
}

const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
const firstPush = queue.dequeue();
console.log('firstPush: ', firstPush); // 1

const size = queue.size();
console.log('size: ', size);

while (!queue.isEmpty()) {
  console.log(queue.peek()); // 2, 3, 4, 5
  queue.dequeue();
}
```

### 재귀 함수

- 재귀 함수(Recursive Function)란 자기 자신을 다시 호출하는 함수를 의미한다.
- 단순한 형태의 재귀함수 예제
  - '재귀 함수를 호출합니다'라는 문자열을 무한히 출력합니다.
  - 어느 정도 출력하다가 최대 콜 스택 사이즈가 초과되었다는 에러가 출력된다.

```js
function recursiveFunction1() {
  console.log('재귀 함수를 호출합니다.');
  recursiveFunction1();
}

recursiveFunction1(); // RangeError: Maximum call stack size exceeded
```

- 재귀 함수를 문제 풀이에서 사용할 때는 재귀 함수의 종료조건을 반드시 명시해야 한다.
- 종료 조건을 제대로 명시하지 않으면 함수가 무한히 호출될 수 있다.
  - 종료 조건을 포함한 재귀함수 예제

```js
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
```

- 예제 1: Factorial
  - 수학적으로 0!, 1!의 값은 1이다.

```js
function factorialIterative(n) {
  let result = 1;
  // 1부터 n까지의 수를 차례대로 곱하기
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

console.log('반복문으로 구현 : ' + factorialRecursive(5)); // 120
console.log('재귀함수로 구현 : ' + factorialIterative(5)); // 120
```

- 예제 2: 최대공약수 계산 (유클리드 호제법)
  - <u>두 개의 자연수에 대한 최대공약수</u>를 구하는 대표적인 알고리즘으로는 **유클리드 호제법**이 있다.
  - **유클리드 호제법**
    - 두 자연수 A,B에 대하여 (A>B) A를 B로 나눈 나머지를 R이라고 하자.
    - 이때 A와 B의 최대공약수는 B와 R의 최대공약수와 같다.
  - 유클리드 호제법의 아이디어를 그대로 재귀 함수로 작성할 수 있다.
    - 예시 : GCD(192,162)
    - 1단계 : 192%162 = 30
    - 2단계 : 162%30 = 12
    - 3단계 : 30%12 = 6
    - 4단계 : 12%6 = 0
    - 최대 공약수 : 6

```js
function gcd(num1, num2) {
  const remain = num1 % num2;
  if (remain === 0) return num2;

  return gcd(num2, remain);
}

console.log(gcd(192, 162)); // 6
```

- 재귀 함수 사용 시 유의 사항
  - 재귀 함수를 잘 활용하면 복잡한 알고리즘을 간결하게 작성할 수 있다.
    - 단, 오히려 다른 사람이 이해하기 어려윤 형태의 코드가 될 수도 있으므로 신중하게 사용해야 한다.
  - 모든 <u>재귀 함수는 반복문을 이용하여 동일한 기능을 구현할 수 있다.</u>
  - 재귀 함수가 반복문 보다 유리한 경우도 있고 불리한 경우도 있다.
  - 컴퓨터가 함수를 연속적으로 호출하면 컴퓨터 메모리 내부의 스택 프레임에 쌓인다.
    - 그래서 스택을 사용해야 할 때 구현상 스택 라이브러리 대신에 재귀 함수를 이용하는 경우가 많다.?

> 출처 : [(이코테 2021 강의 몰아보기) 3. DFS/BFS](https://youtu.be/7C9RgOcvkvo)
