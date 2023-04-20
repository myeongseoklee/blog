// 동물원은 고양이와 강아지에 의존성을 갖고 있다.
// 그리고 동물원은 더 많은 정보를 가지고 있기 때문에 high level 모듈, 고양이와 강아지는 low level 모듈임.
// Traditional Pattern
// 이 때, 양이나 소가 추가된다면 동물원은 더 많은 low level 모듈들에 의존성이 생기는 것이다.
// high level이 의존하는 것이 늘어나면 나중에 코드의 수정과 관리가 어려워진다.
// 그래서 DI를 사용한다.
interface Animal2 {
  speak(): void;
}

class Cat3 implements Animal2 {
  speak(): void {
    console.log('meow');
  }
}

class Dog2 implements Animal2 {
  speak(): void {
    console.log('bark');
  }
}

class Zoo {
  private cat: Cat3;
  private dog: Dog2;

  constructor() {
    this.cat = new Cat3();
    this.dog = new Dog2();
  }

  speakAll(): void {
    this.cat.speak();
    this.dog.speak();
  }
}

const zoo = new Zoo();
zoo.speakAll();

//-------------
// Dependency Inversion Pattern
// 하이레벨인 동물원은 추상모듈인 동물에 의존하게 하고, 로우레벨인 캣과 도그는 애니멀에 의존하게 한다.

abstract class Animal3 {
  // abstract module
  abstract speak(): void; // interface method
}

class Cat4 extends Animal3 {
  speak(): void {
    console.log('meow');
  }
}

class Dog3 extends Animal3 {
  speak(): void {
    console.log('bark');
  }
}

// Zoo depends on Animal. (Not Cat, Not Dog)
// 이처럼 동물원은 로우레벨인 소나 양을 추가하더라도 동물원은 전혀 건드릴 필요가 없다.
class Zoo2 {
  private animals: Animal3[];

  constructor() {
    this.animals = [];
  }

  addAnimal(animal: Animal3): void {
    this.animals.push(animal);
  }

  speakAll(): void {
    this.animals.forEach((animal) => animal.speak());
  }
}

const zoo2 = new Zoo2();
zoo2.addAnimal(new Cat4());
zoo2.addAnimal(new Dog3());
zoo2.speakAll();
