interface AnimalSpec {
  speak(): void;
}

class Cat implements AnimalSpec {
  speak() {
    console.log('meow');
  }
}

class Dog implements AnimalSpec {
  speak() {
    console.log('bark');
  }
}

class Sheep implements AnimalSpec {
  speak() {
    console.log('meh');
  }
}

class Cow implements AnimalSpec {
  speak() {
    console.log('moo');
  }
}

class Animals {
  constructor(private _animals: AnimalSpec[]) {
    this._animals = _animals;
  }

  public speak(): void[] {
    return this._animals.map((animal) => animal.speak());
  }
}

class Main {
  constructor(public animals: Animals) {}

  hey() {
    this.animals.speak();
  }
}

// const app = new Main([new Cat(), new Dog(), new Sheep(), new Cow()]);
const app = new Main(
  new Animals([new Cat(), new Dog(), new Sheep(), new Cow()]),
);

app.hey(); // meow bark meh moo
