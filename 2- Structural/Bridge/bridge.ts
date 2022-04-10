/*

https://refactoring.guru/design-patterns/adapter

Bridge is a structural design pattern that divides business logic or huge class 
into separate class hierarchies that can be developed independently.

One of these hierarchies (often called the Abstraction) will get a reference to an object 
of the second hierarchy (Implementation). 

The abstraction will be able to delegate some (sometimes, most) of its calls to the implementations object. 
Since all implementations will have a common interface, they’d be interchangeable inside the abstraction.

-> Use the Bridge pattern when you want to divide and organize a monolithic class 
that has several variants of some functionality (for example, if the class can work with various database servers).
-> Use the pattern when you need to extend a class in several orthogonal (independent) dimensions.
-> Use the Bridge if you need to be able to switch implementations at runtime.

Usage examples: 
The Bridge pattern is especially useful when dealing with cross-platform apps, 
supporting multiple types of database servers or working with several API providers of a certain kind 
(for example, cloud platforms, social networks, etc.)

Identification: 
Bridge can be recognized by a clear distinction between some controlling entity and several different 
platforms that it relies on.

Complexity: 3/3
Popularity: 1/3
*/

namespace BridgeNamespace {
  /**
   * The Abstraction defines the interface for the "control" part of the two class
   * hierarchies. It maintains a reference to an object of the Implementation
   * hierarchy and delegates all of the real work to this object.
   */
  class Abstraction {
    protected implementation: Implementation;

    constructor(implementation: Implementation) {
      this.implementation = implementation;
    }

    public operation(): string {
      const result = this.implementation.operationImplementation();
      return `Abstraction: Base operation with:\n${result}`;
    }
  }

  /**
  * You can extend the Abstraction without changing the Implementation classes.
  */
  class ExtendedAbstraction extends Abstraction {
    public operation(): string {
      const result = this.implementation.operationImplementation();
      return `ExtendedAbstraction: Extended operation with:\n${result}`;
    }
  }

  /**
  * The Implementation defines the interface for all implementation classes. It
  * doesn't have to match the Abstraction's interface. In fact, the two
  * interfaces can be entirely different. Typically the Implementation interface
  * provides only primitive operations, while the Abstraction defines higher-
  * level operations based on those primitives.
  */
  interface Implementation {
    operationImplementation(): string;
  }

  /**
  * Each Concrete Implementation corresponds to a specific platform and
  * implements the Implementation interface using that platform's API.
  */
  class ConcreteImplementationA implements Implementation {
    public operationImplementation(): string {
      return 'ConcreteImplementationA: Here\'s the result on the platform A.';
    }
  }

  class ConcreteImplementationB implements Implementation {
    public operationImplementation(): string {
      return 'ConcreteImplementationB: Here\'s the result on the platform B.';
    }
  }

  /**
  * Except for the initialization phase, where an Abstraction object gets linked
  * with a specific Implementation object, the client code should only depend on
  * the Abstraction class. This way the client code can support any abstraction-
  * implementation combination.
  */
  function clientCode(abstraction: Abstraction) {
    // ..

    console.log(abstraction.operation());

    // ..
  }

  /**
  * The client code should be able to work with any pre-configured abstraction-
  * implementation combination.
  */
  let implementation = new ConcreteImplementationA();
  let abstraction = new Abstraction(implementation);
  clientCode(abstraction);

  console.log('');

  implementation = new ConcreteImplementationB();
  abstraction = new ExtendedAbstraction(implementation);
  clientCode(abstraction);
}