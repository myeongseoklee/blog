# **SOLID : 객체지향 프로그래밍의 5대 원리**

프로젝트를 시작 할 당시, 객체지향적으로 코드를 작성하거나 아키텍쳐에 대해 잘 몰랐기 때문에 처음부터 객체지향적인 설계는 엄두도 못냈다. 프로젝트 배포를 끝내고 기능을 변경하거나 코드를 리펙토링 하는 과정에서 고쳐야 할 것들이 눈에 너무 띄었다.

그때는 객체지향의 개념을 몰랐기 때문에, 그냥 느낌적으로 '기능 별로 묶어 놔야겠다.', '이 함수 기능이 너무 복잡한데 기능을 좀 나눠야겠다. 이 기능만 다른 누군가 쓸 수도 있잖아?' 이런 생각으로 리펙토링을 했었다.

그런데 아는 만큼 보인다고 했던가. 객체지향의 4가지 특징과 SOLID에 대해 반복 학습하고 나니 이제는 내가 작성한 코드가 뭐가 잘못 되었는지 보이기 시작했다.(어쩌면 대부분 스파게티 코드 일지도...?) 그래서 좋은 아키텍쳐를 설계하고 좋은 코드를 작성할 수 있는 개발자가 되기 위해 아키텍처, 디자인 패턴, OOP에 대해 학습 중이고 5월 중에 대대적인 리펙토링이 예정되어 있다.

일단 SOLID에 대해 학습하고 정리한 내용을 포스팅한다.

<br />

---

## **SRP (단일 책임의 원칙 : Single Responsibility)**

작성된 클래스는 하나의 책임만 가지며 클래스가 제공하는 모든 서비스는 그 하나의 책임을 수행하는데 집중되어 있어야 한다는 원칙. 이는 어떤 변화에 의해 클래스를 변경해야 하는 이유는 오직 하나 뿐이어야한다는 말과도 같다.

책임이란 기준이 모호하기 때문에, 변경을 책임의 기준으로 삼으면 설계에 용이할 수 있다.

어떠한 역할에 대해 변경사항이 발생했을 때, 영향을 받는 기능만 모아둔 클래스라면 동일한 책임을 지닌 기능이 모인 집합으로써 SRP 원칙이 적용된 설계로 볼 수 있을 것 같다.

상품이라는 도메인이 있다면 여러 행동들이 있는데, 이 때 상품을 구매한다는 부분의 로직이 수정이 될 때 상품을 진열한다는 로직은 수정이 되면 안된다는 뜻이다. 즉 변경시 사이드 이펙트가 없어야 한다.

이처럼 변경사항이 있을 때 애플리케이션의 파급효과가 적으면 SRP 원칙을 잘 따른 것으로 볼 수 있다.

### **코드예제**

```jsx
/**
 * 함수형 예제
 */
function add(num1, num2) {
  return num1 + num2;
}

function numPrint(num) {
  console.log(num);
}

/**
 * add와 numPrint는 각각 하나의 기능을 가진 함수이다.
 * 그런데 굳이 함수의 수를 줄이기 위해 합쳐진 하나의 함수를 만들 필요는 없다는 뜻이다.
 */

function addPrint(num1, num2) {
  const num = num1 + num2;
  console.log(num);
  return num;
}

// class 예제
class Cat {
  constructor(age, name) {
    this.age = age;
    this.name = name;
  }

  eat(food) {}

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
console.log(kitty.represent(), new Date()); // age:2 name:kitty 2023-04-20T05:32:57.417Z
```

<br />

---

## **OCP (개방 폐쇄 원칙 : Open Close)**

토비의 스프링에서 개방 폐쇄 원칙을 **높은 응집도**와 **낮은 결합도** 라는 원리로 설명할 수 있다고 한다.

📌 높은 응집도 : 응집도가 높다는건 하나의 모듈, 클래스가 하나의 책임 또는 관심사에만 집중되어 있다는 뜻이다. 같은 책임, 관심사를 기반으로 하나의 객체로 설계하기 때문에 객채에 변경이 발생하더라도 다른 곳에 미치는 영향이 제한적이다.

📌 낮은 결합도 : 책임과 관심사가 다른 객체 또는 모듈과는 낮은 결합도를 유지해야 한다. 이는 높은 응집도 보다 더 민감한 원칙이라고 토비의 스프링에서는 설명하고 있다.

📌 결합도란 하나의 오브젝트가 변경이 일어날 때 관계를 맺고 잇는 다른 오브젝트에게 변화를 요구하는 정도로 설명한다

📌 즉 낮은 결합도란 하나의 변경이 발생할 때 다른 모듈과 객체로 변경에 대한 요구가 전파되지 않는 상태라고 할 수 있다.

다른 곳에서는 개방폐쇄 원칙을 확장에 열려있고 변경에 닫혀있다고도 설명한다.

📌 확장에 열려있다? : 모듈의 확장성을 보장하는 것을 의미한다. 새로운 변경사항이 발생했을 때 유연하게 코드를 추가 또는 수정할 수 있기 때문이라고 한다.

📌 변경에 닫혀있다? : 객체를 직접적으로 수정하는 건 제한해야 한다. 기능이 추가되거나 수정할 때, 객체를 직접적으로 수정해야 한다면 새로운 변경사항에 대해 유연하게 대응할 수 없는 애플리케이션이다. 이는 유지보수 비용증가가 될 수 있으며, 객체지향적인 설계로 볼 수 없다.

따라서 객체를 직접 수정하지 않고도 변경사항을 적용할 수 있도록 설계해야 한다. 그래서 변경에 닫혔다고 표현한 것으로 추론된다.

결과적으로 OCP는 추상화를 의미하는 것으로 해석된다. 객체를 추상화함으로써 확장엔 열려있고, 변경엔 닫혀있는 유연한 구조를 만들 수 있는 것이다.

OCP를 구현하기 위해서는 **DI(Dependency Injection)**, **IoC(Inversion Of Container)** 가 필요하다.

OCP를 가능케하는 중요 메커니즘은 추상화와 다형성이다.

전역변수를 선언하는 것은 OCP원칙을 위배한다. → 밖에서 변경이 가능한 변수니까.

달라지는 부분을 찾아서 나머지 코드에 영향을 주지 않도록 ‘캡슐화’한다. 그러면 코드를 변경하는 과정에서 사이드 이펙트를 줄이면서 시스템의 유연성을 향상시킬 수 있다.

**_다시말해_** 코드에 새로운 요구사항이 있을 때마다 바뀌는 부분이 있다면 분리해야 한다.

**"바뀌는 부분은 따로 뽑아서 캡슐화 한다. 그러면 나중에 바뀌지 않는 부분에는 영향을 미치지 않고 그 부분만 고치거나 확장할 수 있다"**

이 개념은 매우 간단하지만 다른 모든 디자인 패턴의 기반을 이루는 원칙이다. 모든 패턴은 ‘시스템의 일부분을 다른 부분과 독립적으로 변화시킬 수 있는 방법’을 제공하니까.

소프트웨어의 구성요소(컴포넌트, 클래스, 모듈, 함수)는 확장에 대해서는 열려 있어야 하고, 변경에 있어서는 닫혀있어야 한다.

기능을 추가할 때, 기존의 코드를 수정하지 않고도 기능을 추가할 수 있어야 한다.

서비스가 고수준, 레포지토리가 저수준 근데 저수준에서 변경이 있을 때 이런 변경이 고수준에 영향이 없어야 한다.

### **코드 예제**

```js
// OCP 미적용

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


```

OCP는 확장에는 열리고 수정에는 닫혀한다.

만약 동물의 수가 늘어난다면 동물의 수와는 무관해야 할 hey 메서드가 수정되어야 하고, 동물의 멤버변수를 main에 등록까지 해주어야 한다. 즉, 확장에 제한이 생기고 코드를 수정까지 해야하므로 확장에 닫히고 수정에 열린 상태가 된다.

이런 구조가 된 이유(문제)는 Main이 너무 많은 것에 의존해 있다는 것이다.

Main의 주요 메소드는 모든 동물의 울음 소리를 출력하는 것인데, Main에서 모든 동물들을 멤버변수로 등록하는 방식이기 때문에 주입(DI)되어야 하는 의존성이 너무 많아진다. 위의 예로 보면 main이 cat, dog에 의존하고 있다. 만약 동물의 가지수가 늘어나면 그 수만큼 의존이 늘어난다.

main은 어떤 동물들이 있는지는 알 필요가 없다. speak 메소드를 가진 동물들의 집합(set, 여기서는 배열)만 알고 있으면 된다.

이 문제를 해결하기 위해 interface를 활용하여 animal의 메소드를 추상화하고, 이를 구현한 구현체 class를 생성한다. 그리고 그 구현체들을 아우르는 하나의 클래스를 만들어 main이 의존하게 한다.

```js
// OCP 적용
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

const app = new Main(
  new Animals([new Cat(), new Dog(), new Sheep(), new Cow()]),
);

app.hey(); // meow bark meh moo
```

<br />

---

## **LSP (리스코프 치환 원칙 : The Liskov Substitution)**

객체는 프로그램의 정확성을 깨지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다. 다른 말로 하위 클래스는 인터페이스 규약을 지켜서 작성되어야 한다는 뜻이기도 하다.

📌 다형성을 지키기 위한 원칙, 인터페이스를 구현한 구현체는 믿고 사용하려면 LSP가 필요하다. 인터페이스의 메소드를 사용한다고 하면 어떤 구현체를 사용하든 호출부에서 기대하는대로 동작되어야 한다는 것이다.

상속이라는 것은 재사용의 목적도 있지만 확장의 목적도 있는데, 구현상속(extends)이든 인터페이스 구현(implements)이든 궁극적으로는 다형성을 통한 확장성 획득을 목표로한다. LSP원리도 역시 서브 클래스가 확장에 대한 인터페이스를 준수해야 함을 의미한다. \*\*다형성과

확장성을 극대화 하려면 하위 클래스를 사용하는 것 보다는 상위의 클래스(인터페이스)를 사용하는 것이 더 좋다.\*\* 일반적으로 선언은 기반 클래스로, 생성은 구체 클래스로 대입하는 방법을 사용한다.

📌 물론 클래스 상속과 인터페이스 구현에 차이는 있다. 즉, 양자 모두 상위 클래스-하위 클래스의 관계를 전제하면서 공통적인 속성과 기능을 공유할 수 있지만, 상속의 경우 상위 클래스의 속성과 기능들을 하위 클래스에서 그대로 받아 사용하거나 오버라이딩을 통해 선택적으로 재정의하여 사용할 수 있는 반면, 인터페이스를 통한 구현은 반드시 인터페이스에 정의된 추상 메서드의 내용이 하위 클래스에서 정의되어야 한다.

📌 결론적으로, 상속 관계의 경우 인터페이스를 사용하는 구현에 비해 추상화의 정도가 낮다고 할 수 있다. 인터페이스가 역할에 해당하는 껍데기만 정의해두고, 하위 클래스에서 구체적인 구현을 하도록 강제하는 것에 비해, 상속 관계의 경우 상황에 따라 모든 구체적인 내용들을 정의해두고 하위 클래스에서는 그것을 단순히 가져다가 재사용할 수 있다.

> 출처 : [객체지향 프로그래밍 특징](https://www.codestates.com/blog/content/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%ED%8A%B9%EC%A7%95)

상속을 통한 재사용은 기반 클래스와 서브 클래스 사이에 IS-A 관계가 있을 경우로만 제한되어야 한다. 그 외의 경우에는 합성을 통한 재사용을 해야 한다.

📌 합성은 중복되는 로직들을 갖는 객체를 구현하고, 이 객체를 주입받아 중복 로직을 호출함으로써 퍼블릭 인터페이스를 재사용하는 방법이다. 흔히 합성은 Has-a 관계라고 많이 불린다.

📌 예를 들어 요리사가 음식의 가격을 계산해야 하는 상황이라고 하자. 그러면 요리사는 자신이 만든 음식들을 가지고 있으므로 이러한 관계를 Has-a 관계라고 한다.

```js
interface Food {
  getPrice(): number;
}

class Chef {
  constructor(private _foodList: Food[]) {
    this._foodList = _foodList;
  }

  public calculatePrice(): number {
    return this._foodList
      .map((v) => v.getPrice())
      .reduce((sum, price) => sum + price, 0);
  }
}
```

### **코드예제**

```js
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
```

<br />

---

# **ISP (인터페이스 분리 원칙 : Interface Segregation)**

범용 인터페이스 하나보다는 특정 클라이언트(객체를 사용하는 사용자)를 위한 여러개의 인터페이스 분리가 더 좋다고 한다.

SRP가 클래스의 단일책임을 강조한다면 ISP는 인터페이스의 단일책임을 강조한다.

하나의 일반적인 인터페이스보다는 구체적인 여러개의 인터페이스를 사용해야 한다.

사용에 맞게 인터페이스를 분리시킨다.

## **코드예제**

```js
// 인터페이스 분리 원칙.
// 클라이언트는 사용하지도 않는 메소드들에 의존하게 해서는 안되고, 큰 인터페이스는 작은 단위로 분리시키는 것이 좋다는 원칙

//No Interface Segregation Principle

//Large Interface
interface ICarBoat {
  drive(): void;
  turnLeft(): void;
  turnRight(): void;
  steer(): void;
  steerLeft(): void;
  steerRight(): void;
}

//Interface Segregation Principle
//two small interfaces (Car, Boat)
interface ICar {
  drive(): void;
  turnLeft(): void;
  turnRight(): void;
}

interface IBoat {
  steer(): void;
  steerLeft(): void;
  steerRight(): void;
}

class Avante implements ICar {
  public drive(): void {
    //implementation
  }
  public turnLeft(): void {
    //implementation
  }
  public turnRight(): void {
    //implementation
  }
}

class CarBoat implements ICar, IBoat {
  public drive(): void {
    //implementation
  }
  public turnLeft(): void {
    //implementation
  }
  public turnRight(): void {
    //implementation
  }
  public steer(): void {
    //implementation
  }
  public steerLeft(): void {
    //implementation
  }
  public steerRight(): void {
    //implementation
  }
}
```

<br>

---

# **DIP (의존성 역전 원칙 : Dependency Inversion)**

의존 관계의 역전이란 구조적 디자인에서 발생하던 하위 레벨 모듈의 변경이 상위 레벨 모듈의 변경을 요구하는 위계 관계를 끊는 의미의 역전이다.

프로그래머는 구체화가 아니라 추상화에 의존해야 한다고 한다. 즉, 구현 클래스(구현체)가 아니라 인터페이스(역할)에 의존하라는 이야기이다.

📌 연극을 예로 들면 배역(인터페이스)과 배우(구현체)를 예로 들 수 있다. 이 때 연극은 특정 배우를 염두에 두고 기획되기 보다 배역에 집중해서 기획되어야 한다.

📌 특정 배우에 의존했는데 만약 그 배우가 스케줄 또는 당일 컨디션 때문에 연극에 출연이 불발 될 경우 해당 연극은 차질이 불가피해진다. 따라서 연극은 배우가 아닌 배역에 의존해야 한다.

의존성은 추상화된 것에 의존하며 구현체에는 의존하지 않는다.

아키텍처에서 가장 중요한 부분

포트앤 어댑터 패턴처럼 가운데 interface를 통해 통신하는 경우 DIP를 사용한 것이다.

## **코드예제**

```js
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
```

> 참고
>
> 📌 [코드 없는 프로그래밍 : 디자인패턴 SOLID](https://www.youtube.com/playlist?list=PLDV-cCQnUlIZcWXE4PrxJx6U3qKfRTJcK)
> 📌 [객체지향 개발 5대 원리:SOLID](https://www.nextree.co.kr/p6960/)
> 📌 [[OOP] 코드의 재사용, 상속보다 합성을 사용해야 하는 이유](https://mangkyu.tistory.com/199)
