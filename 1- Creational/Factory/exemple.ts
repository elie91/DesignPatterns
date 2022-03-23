/*

https://refactoring.guru/design-patterns/factory-method

Factory method is a creational design pattern 
which solves the problem of creating product objects without specifying their concrete classes.

Complexity: 1/3
Popularity: 3/3
*/
namespace FactoryExoNamespace {

  interface Button {
    render: () => string;
    onClick: () => string;
  }

  class WindowsButton implements Button {
    render: () => 'rendering windows button';
    onClick: () => 'on click windows button';
  }

  class LinuxButton implements Button {
    render: () => 'rendering linux button';
    onClick: () => 'on click linux button';
  }

  class MacButton implements Button {
    render: () => 'rendering mac button';
    onClick: () => 'on click mac button';
  }

  abstract class AbstractProductCreator {
    public abstract createButton(): Button;
  }

  class WindowsButtonCreator extends AbstractProductCreator {
    public createButton(): Button {
      return new WindowsButton();
    }
  }

  class LinuxButtonCreator extends AbstractProductCreator {
    public createButton(): Button {
      return new LinuxButton();
    }
  }

  class MacButtonCreator extends AbstractProductCreator {
    public createButton(): Button {
      return new MacButton();
    }
  }

  function clientCode(creator: AbstractProductCreator) {
    // Create Windows, Mac, or Linux Button
    creator.createButton();
  }

  clientCode(new WindowsButtonCreator());
  clientCode(new LinuxButtonCreator());
  clientCode(new MacButtonCreator());

}