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