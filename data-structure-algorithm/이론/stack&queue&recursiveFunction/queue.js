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
