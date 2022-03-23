/*

https://refactoring.guru/design-patterns/prototype

Prototype is a creational design pattern that allows cloning objects, 
even complex ones, without coupling to their specific classes.

All prototype classes should have a common interface that makes it possible to copy objects 
even if their concrete classes are unknown. 

Prototype objects can produce full copies since objects of the same class can access each other’s private fields.

An object that supports cloning is called a prototype. 
When your objects have dozens of fields and hundreds of possible configurations,
cloning them might serve as an alternative to subclassing.

you create a set of objects, configured in various ways. 
When you need an object like the one you’ve configured, 
you just clone a prototype instead of constructing a new object from scratch.

Complexity: 1/3
Popularity: 2/3
*/
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