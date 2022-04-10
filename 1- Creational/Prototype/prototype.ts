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


-> Use the Prototype pattern when your code shouldn’t depend on the concrete classes of objects that you need to copy.
-> Use the pattern when you want to reduce the number of subclasses that only differ in the way they initialize their respective objects. 
Somebody could have created these subclasses to be able to create objects with a specific configuration.

Usage examples: 
The Prototype pattern is available in TypeScript out of the box with a JavaScript’s native Object.assign() method.

Identification: 
The prototype can be easily recognized by a clone or copy methods, etc.

Complexity: 1/3
Popularity: 2/3
*/

namespace PrototypeNamespace {

  /**
   * The example class that has cloning ability. We'll see how the values of field
   * with different types will be cloned.
   */
  class Prototype {
    public primitive: any;
    public component: object;
    public circularReference: ComponentWithBackReference;

    public clone(): this {
      const clone = Object.create(this);

      clone.component = Object.create(this.component);

      // Cloning an object that has a nested object with backreference
      // requires special treatment. After the cloning is completed, the
      // nested object should point to the cloned object, instead of the
      // original object. Spread operator can be handy for this case.
      clone.circularReference = {
        ...this.circularReference,
        prototype: { ...this },
      };

      return clone;
    }
  }

  class ComponentWithBackReference {
    public prototype;

    constructor(prototype: Prototype) {
      this.prototype = prototype;
    }
  }

  /**
   * The client code.
   */
  function clientCode() {
    const p1 = new Prototype();
    p1.primitive = 245;
    p1.component = new Date();
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();
    if (p1.primitive === p2.primitive) {
      console.log('Primitive field values have been carried over to a clone. Yay!');
    } else {
      console.log('Primitive field values have not been copied. Booo!');
    }
    if (p1.component === p2.component) {
      console.log('Simple component has not been cloned. Booo!');
    } else {
      console.log('Simple component has been cloned. Yay!');
    }

    if (p1.circularReference === p2.circularReference) {
      console.log('Component with back reference has not been cloned. Booo!');
    } else {
      console.log('Component with back reference has been cloned. Yay!');
    }

    if (p1.circularReference.prototype === p2.circularReference.prototype) {
      console.log('Component with back reference is linked to original object. Booo!');
    } else {
      console.log('Component with back reference is linked to the clone. Yay!');
    }
  }

  clientCode();
}