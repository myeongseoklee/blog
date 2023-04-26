class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  // 배열의 push
  enQueue(item) {
    const node = new Node(item);

    if (!this.rear) {
      this.front = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }
    this.size++;
  }

  // 배열의 shift
  deQueue() {
    if (!this.front) {
      return;
    }

    const deQueued = this.front;
    if (this.front === this.rear) {
      this.rear = null;
    }
    this.front = this.front.next;
    this.size--;

    return deQueued.item;
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

const queue = new Queue();

for (let i = 0; i < 5; i++) {
  queue.enQueue(i);
  console.log('queue: ', queue);
}

console.log(queue.isExist(2));

for (let i = 4; i >= 0; i--) {
  queue.deQueue(i);
  console.log(queue);
}
