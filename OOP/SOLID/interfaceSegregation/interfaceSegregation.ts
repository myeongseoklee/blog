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
