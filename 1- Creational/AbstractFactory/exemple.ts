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

namespace AbstractFactoryExoNamespace {

  interface Chair {
    operation: () => string;
  }

  interface Sofa {
    operation: () => string;
  }

  interface CoffeeTable {
    operation: () => string;
  }

  class ModernChair implements Chair {
    operation() {
      return 'ModernChair product'
    }
  }

  class VictorianChair implements Chair {
    operation() {
      return 'VictorianChair product'
    }
  }

  class ModernSofa implements Sofa {
    operation() {
      return 'ModernSofa product'
    }
  }

  class VictorianSofa implements Sofa {
    operation() {
      return 'VictorianSofa product'
    }
  }

  class ModernCoffeeTable implements CoffeeTable {
    operation() {
      return 'ModernCoffeeTable product'
    }
  }

  class VictorianCoffeeTable implements CoffeeTable {
    operation() {
      return 'VictorianCoffeeTable product'
    }
  }


  interface AbstractFurnitureFactory {
    createChair(): Chair;
    createSofa(): Sofa;
    createCoffeeTable(): CoffeeTable;
  }

  class ModernFurnitureFactory implements AbstractFurnitureFactory {
    createChair(): Chair {
      return new ModernChair();
    }

    createCoffeeTable(): CoffeeTable {
      return new ModernCoffeeTable();
    }

    createSofa(): Sofa {
      return new ModernSofa();
    }
  }

  class VictorianFurnitureFactory implements AbstractFurnitureFactory {
    createChair(): Chair {
      return new VictorianChair();
    }

    createCoffeeTable(): CoffeeTable {
      return new VictorianCoffeeTable();
    }

    createSofa(): Sofa {
      return new VictorianSofa();
    }
  }



  function clientCode(factory: AbstractFurnitureFactory) {

    // Create Chair, Sofa and CoffeeTable with one specific variant
    // Do not modify code when adding a new variant
    factory.createChair();
    factory.createCoffeeTable();
    factory.createSofa();
  }

  clientCode(new ModernFurnitureFactory());
  clientCode(new VictorianFurnitureFactory());

}