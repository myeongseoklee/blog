/**
 * 함수형 예제
 */
function add(num1: number, num2: number) {
  return num1 + num2;
}

function numPrint(num: number) {
  console.log(num);
}

/**
 * add와 numPrint는 각각 하나의 기능을 가진 함수이다.
 * 그런데 굳이 함수의 수를 줄이기 위해 합쳐진 하나의 함수를 만들 필요는 없다는 뜻이다.
 */

function addPrint(num1: number, num2: number) {
  const num = num1 + num2;
  console.log(num);
  return num;
}

// class 예제
class Cat {
  constructor(public age: number, public name: string) {}

  eat(food: string) {}

  walk() {}

  speak() {}

  // log() {
  //   console.log(`age:${this.age} name:${this.name}`);
  //   console.log(new Date());
  // }

  represent() {
    return `age:${this.age} name:${this.name}`;
  }
}

// 여기서 고양이의 먹기, 걷기, 말하기는 고양이의 기능인데 log는 고양이의 기능이 아니다.
// 즉 srp 위반.
// 그래서 저 기능들을 빼서 다른 방식으로 두개의 기능을 구현해야 한다.
// 고양이의 상태를 나타내주는 repr 함수를 만들어 줄 수 있다.
const kitty = new Cat(2, 'kitty');
console.log(kitty.represent(), new Date());
