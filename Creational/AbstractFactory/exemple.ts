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