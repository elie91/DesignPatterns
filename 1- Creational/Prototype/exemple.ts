namespace PrototypeExempleNamespace {

  class ShapePrototype {
    private position: { x: number, y: number }
    private color: string;
    public circularReference: ComponentWithBackReference;

    public clone(): this {
      const clone = Object.create(this);
      clone.position = Object.create(this.position);
      return clone;
    }
  }

  class ComponentWithBackReference {
    public prototype;

    constructor(prototype: ShapePrototype) {
      this.prototype = prototype;
    }
  }


  class Rectangle extends Shape {
    private width: string;
    private heigth: string;

    constructor(source: Rectangle) {
      super(source);
      this.width = source.width;
      this.heigth = source.heigth;
    }

    clone(): Shape {
      return new Rectangle(this);
    }
  }

  class Circle extends Shape {
    private radius: number;

    constructor(source: Circle) {
      super(source);
      this.radius = source.radius;
    }

    clone(): Shape {
      return new Circle(this)
    }
  }


  function clientCode() {
    const shapes: Shape[];

    circle = new Circle();
  }

  clientCode();
}