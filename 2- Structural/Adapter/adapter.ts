/*

https://refactoring.guru/design-patterns/adapter

Adapter is a structural design pattern, which allows incompatible objects to collaborate.

The Adapter acts as a wrapper between two objects. 
It catches calls for one object and transforms them to format and interface recognizable by the second object

The Adapter pattern is pretty common in TypeScript code. 
It’s very often used in systems based on some legacy code. 
In such cases, Adapters make legacy code work with modern classes.

Adapter is recognizable by a constructor which takes an instance of a different abstract/interface type. 
When the adapter receives a call to any of its methods, it translates parameters to the appropriate format 
and then directs the call to one or several methods of the wrapped object.

Complexity: 1/3
Popularity: 3/3
*/

namespace AdapterNamespace {
  /**
   * The Target defines the domain-specific interface used by the client code.
   */
  class Target {
    public request(): string {
      return 'Target: The default target\'s behavior.';
    }
  }

  /**
  * The Adaptee contains some useful behavior, but its interface is incompatible
  * with the existing client code. The Adaptee needs some adaptation before the
  * client code can use it.
  */
  class Adaptee {
    public specificRequest(): string {
      return '.eetpadA eht fo roivaheb laicepS';
    }
  }

  /**
  * The Adapter makes the Adaptee's interface compatible with the Target's
  * interface.
  */
  class Adapter extends Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
      super();
      this.adaptee = adaptee;
    }

    public request(): string {
      const result = this.adaptee.specificRequest().split('').reverse().join('');
      return `Adapter: (TRANSLATED) ${result}`;
    }
  }

  /**
 * The client code supports all classes that follow the Target interface.
 */
  function clientCode(target: Target) {
    console.log(target.request());
  }

  console.log('Client: I can work just fine with the Target objects:');
  const target = new Target();
  clientCode(target);

  console.log('');

  const adaptee = new Adaptee();
  console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
  console.log(`Adaptee: ${adaptee.specificRequest()}`);

  console.log('');

  console.log('Client: But I can work with it via the Adapter:');
  const adapter = new Adapter(adaptee);
  clientCode(adapter);
}