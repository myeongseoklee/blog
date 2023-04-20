class Cat2 {
  speak() {
    console.log('meow');
  }
}

class BlackCat extends Cat2 {
  speak() {
    console.log('black meow');
  }
}

function speak(cat: Cat2) {
  cat.speak();
}

const cat = new Cat2();
speak(cat);

const blackCat = new BlackCat();
speak(blackCat);

//-------
// 당연히 생선은 말을 못하니까 예외를 던지는 메소드로 넣는다면, 에러가 발생한다.
// 즉 애초에 고양이 밑에 생선을 넣는다는 것은 고양이를 생선으로 치환도 할 수 없고 리스코프치환 법칙에도 위배하는 클래스 구조인것이다.
// 처음부터 전체적인 클래스 구조를 고양이와 물고기를 생각하고 짜야한다.
class Fish extends Cat2 {
  speak() {
    throw new Error('Fish cannot speak');
  }
}

const cat2 = new Fish();
speak(cat2); // Error: Fish cannot speak
