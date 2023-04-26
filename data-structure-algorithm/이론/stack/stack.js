class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  // 배열의 unshift
  push(item) {
    const node = new Node(item);

    if (!this.front) {
      this.front = node;
      this.rear = node;
    } else {
      const next = this.front;
      this.front = node;
      this.front.next = next;
    }

    this.size++;
  }

  // 배열의 shift
  pop() {
    if (!this.front) return null;

    const popped = this.front;

    if (this.front === this.rear) {
      this.rear = null;
    }

    this.front = this.front.next;
    this.size--;

    return popped.item;
  }

  isExist(item) {
    let clone = this.front;

    while (clone !== null) {
      if (clone.item === item) return true;

      clone = clone.next;
    }

    return false;
  }
}

const stack = new Stack();

for (let i = 0; i < 5; i++) {
  stack.push(i);
  console.log('stack: ', stack);
}

console.log(stack.isExist(2));

for (let i = 4; i >= 0; i--) {
  stack.pop(i);
  console.log('stack: ', stack);
}
