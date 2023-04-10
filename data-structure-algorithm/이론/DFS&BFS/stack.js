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
