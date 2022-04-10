/*

https://refactoring.guru/design-patterns/abstract-factory

Abstract Factory is a creational design pattern
which solves the problem of creating entire product families without specifying their concrete classes.

-> Use the Abstract Factory when your code needs to work with various families of related products, 
but you don’t want it to depend on the concrete classes of those products; 
they might be unknown beforehand or you simply want to allow for future extensibility. 

Usage examples: 
The Abstract Factory pattern is pretty common in TypeScript code. 
Many frameworks and libraries use it to provide a way to extend and customize their standard components.

Identification: 
The pattern is easy to recognize by methods, which return a factory object. 
Then, the factory is used for creating specific sub-components.

Complexity: 2/3
Popularity: 3/3

*/

namespace AbstractFactoryNamespace {

  /**
    The Abstract Factory interface declares a set of methods that return
    different abstract products. 
    
    These products are called a family and are related by a high-level theme or concept. 
    
    Products of one family are usually able to collaborate among themselves. 
    A family of products may have several variants, but the products of one variant 
    are incompatible with products of another.
   */
  interface AbstractFurnitureFactory {
    createChair(): Chair;

    createCoffeeTable(): CoffeTable;
  }

  /**
    Concrete Factories produce a family of products that belong to a single variant. 
    The factory guarantees that resulting products are compatible. 
    Note that signatures of the Concrete Factory's methods return an abstract product,
    while inside the method a concrete product is instantiated.
   */
  class VictorianFurnitureFactory implements AbstractFurnitureFactory {
    public createChair(): Chair {
      return new VictorianChair();
    }

    public createCoffeeTable(): CoffeTable {
      return new VictorianCoffeTable();
    }
  }

  class ModernFurnitureFactory implements AbstractFurnitureFactory {
    public createChair(): Chair {
      return new ModernChair();
    }

    public createCoffeeTable(): CoffeTable {
      return new ModernCoffeTable();
    }
  }

  /**
   * Each distinct product of a product family should have a base interface. All
   * variants of the product must implement this interface.
   */
  interface Chair {
    hasLegs(): boolean;
    usefulFunction: () => void;
  }

  /**
  * These Concrete Products are created by corresponding Concrete Factories.
  */
  class VictorianChair implements Chair {
    public usefulFunction(): string {
      return 'The result of the product VictorianChair.';
    }
    public hasLegs(): boolean {
      return true;
    }
  }

  class ModernChair implements Chair {
    public usefulFunction(): string {
      return 'The result of the product ModernChair.';
    }
    public hasLegs(): boolean {
      return false;
    }
  }

  /**
   * Here's the the base interface of another product. All products can interact
   * with each other, but proper interaction is possible only between products of
   * the same concrete variant.
   */
  interface CoffeTable {
    /**
     * Product B is able to do its own thing...
     */
    usefulFunction(): string;

    /**
     * ...but it also can collaborate with the ProductA.
     *
     * The Abstract Factory makes sure that all products it creates are of the
     * same variant and thus, compatible.
     */
    anotherUsefulFunctionB(collaborator: Chair): string;
  }

  /**
   * These Concrete Products are created by corresponding Concrete Factories.
   */
  class VictorianCoffeTable implements CoffeTable {

    public usefulFunction(): string {
      return 'The result of the product VictorianCoffeTable.';
    }

    /**
     * The variant, Product B1, is only able to work correctly with the variant,
     * Product A1. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     */
    public anotherUsefulFunctionB(collaborator: Chair): string {
      const result = collaborator.usefulFunction();
      return `The result of the VictorianCoffeTable collaborating with the (${result})`;
    }
  }

  class ModernCoffeTable implements CoffeTable {

    public usefulFunction(): string {
      return 'The result of the product ModernCoffeTable.';
    }

    /**
     * The variant, Product B2, is only able to work correctly with the variant,
     * Product A2. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     */
    public anotherUsefulFunctionB(collaborator: Chair): string {
      const result = collaborator.usefulFunction();
      return `The result of the ModernCoffeTable collaborating with the (${result})`;
    }
  }

  /**
   * The client code works with factories and products only through abstract
   * types: AbstractFactory and AbstractProduct. This lets you pass any factory or
   * product subclass to the client code without breaking it.
   */
  function clientCode(factory: AbstractFurnitureFactory) {
    const chair = factory.createChair();
    const coffeeTable = factory.createCoffeeTable();

    console.log(chair.usefulFunction());
    console.log(coffeeTable.anotherUsefulFunctionB(chair));
  }

  /**
  * The client code can work with any concrete factory class.
  */
  console.log('Client: Testing client code with the ModernFurnitureFactory');
  clientCode(new ModernFurnitureFactory());

  console.log('Client: Testing the same client code with the VictorianFurnitureFactory...');
  clientCode(new VictorianFurnitureFactory());

}