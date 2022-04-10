/*

https://refactoring.guru/design-patterns/factory-method

Factory method is a creational design pattern 
which solves the problem of creating product objects without specifying their concrete classes.

-> Use the Factory Method when you don’t know beforehand the exact types and dependencies of the objects your code should work with.
-> Use the Factory Method when you want to provide users of your library or framework with a way to extend its internal components.
-> Use the Factory Method when you want to save system resources by reusing existing objects instead of rebuilding them each time.

Usage examples: 
The Factory Method pattern is widely used in TypeScript code. 
It’s very useful when you need to provide a high level of flexibility for your code.

Identification: 
Factory methods can be recognized by creation methods, which create objects from concrete classes, 
but return them as objects of abstract type or interface.

Complexity: 1/3
Popularity: 3/3
*/

namespace FactoryNamespace {

  /**
   * The Product interface declares the operations that all concrete products must
   * implement.
   */
  interface Product {
    operation(): string;
  }

  /**
   * The Creator class declares the factory method that is supposed to return an
   * object of a Product class. The Creator's subclasses usually provide the
   * implementation of this method.
   */
  abstract class Creator {
    /**
     * Note that the Creator may also provide some default implementation of the
     * factory method.
     */
    public abstract createProduct(): Product;

    /**
     * Also note that, despite its name, the Creator's primary responsibility is
     * not creating products. Usually, it contains some core business logic that
     * relies on Product objects, returned by the factory method. Subclasses can
     * indirectly change that business logic by overriding the factory method
     * and returning a different type of product from it.
     */
    public someOperation(): string {
      // Call the factory method to create a Product object.
      const product = this.createProduct();
      // Now, use the product.
      return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
  }

  /**
   * Concrete Creators override the factory method in order to change the
   * resulting product's type.
   */
  class ConcreteCreator1 extends Creator {
    /**
     * Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     */
    public createProduct(): Product {
      return new ConcreteProduct1();
    }
  }

  class ConcreteCreator2 extends Creator {
    public createProduct(): Product {
      return new ConcreteProduct2();
    }
  }

  /**
   * Concrete Products provide various implementations of the Product interface.
   */
  class ConcreteProduct1 implements Product {
    public operation(): string {
      return '{Result of the ConcreteProduct1}';
    }
  }

  class ConcreteProduct2 implements Product {
    public operation(): string {
      return '{Result of the ConcreteProduct2}';
    }
  }

  /**
   * The client code works with an instance of a concrete creator, albeit through
   * its base interface. As long as the client keeps working with the creator via
   * the base interface, you can pass it any creator's subclass.
   */
  function clientCode(creator: Creator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
    // ...
  }


  /**
   * The Application picks a creator's type depending on the configuration or
   * environment.
   */
  console.log('App: Launched with the ConcreteCreator1.');
  clientCode(new ConcreteCreator1());
  console.log('');

  console.log('App: Launched with the ConcreteCreator2.');
  clientCode(new ConcreteCreator2());

}