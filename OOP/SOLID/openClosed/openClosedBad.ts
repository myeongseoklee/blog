class Animal {
  constructor(public type: string) {}
}

class Main {
  cat: Animal = new Animal('Cat');
  dog: Animal = new Animal('Dog');
  animals: Animal[] = [this.cat, this.dog];

  hey() {
    this.animals.map((animal) => {
      if (animal.type === 'Cat') {
        console.log('meow');
      } else if (animal.type === 'Dog') {
        console.log('bark');
      } else {
        console.log('Unknown animal type');
      }
    });
  }
}

const app = new Main();

app.hey(); // meow bark
