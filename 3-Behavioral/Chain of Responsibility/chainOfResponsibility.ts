/*

https://refactoring.guru/design-patterns/chain-of-responsibility

Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. 
Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.


The pattern allows multiple objects to handle the request without coupling sender class to the concrete classes 
of the receivers. 

The chain can be composed dynamically at runtime with any handler that follows a standard handler interface.

-> Use the Chain of Responsibility pattern when your program is expected to process different kinds of requests in various ways, 
but the exact types of requests and their sequences are unknown beforehand.
-> Use the pattern when it’s essential to execute several handlers in a particular order.
-> Use the CoR pattern when the set of handlers and their order are supposed to change at runtime.

Usage examples: 
The Chain of Responsibility pattern isn’t a frequent guest in a TypeScript program 
since it’s only relevant when code operates with chains of objects.

Identification: 
 The pattern is recognizable by behavioral methods of one group of objects that indirectly 
 call the same methods in other objects, while all the objects follow the common interface.

Complexity: 2/3
Popularity: 1/3
*/


namespace ChainOfResponsibilityNamespace {
  /**
   * The Handler interface declares a method for building the chain of handlers.
   * It also declares a method for executing a request.
   */
  interface Handler {
    setNext(handler: Handler): Handler;

    handle(request: string): string | null;
  }

  /**
  * The default chaining behavior can be implemented inside a base handler class.
  */
  abstract class AbstractHandler implements Handler {
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      // Returning a handler from here will let us link handlers in a
      // convenient way like this:
      // monkey.setNext(squirrel).setNext(dog);
      return handler;
    }

    public handle(request: string): string | null {
      if (this.nextHandler) {
        return this.nextHandler.handle(request);
      }

      return null;
    }
  }

  /**
  * All Concrete Handlers either handle a request or pass it to the next handler
  * in the chain.
  */
  class MonkeyHandler extends AbstractHandler {
    public handle(request: string): string | null {
      if (request === 'Banana') {
        return `Monkey: I'll eat the ${request}.`;
      }
      return super.handle(request);

    }
  }

  class SquirrelHandler extends AbstractHandler {
    public handle(request: string): string | null {
      if (request === 'Nut') {
        return `Squirrel: I'll eat the ${request}.`;
      }
      return super.handle(request);
    }
  }

  class DogHandler extends AbstractHandler {
    public handle(request: string): string | null {
      if (request === 'MeatBall') {
        return `Dog: I'll eat the ${request}.`;
      }
      return super.handle(request);
    }
  }

  /**
  * The client code is usually suited to work with a single handler. In most
  * cases, it is not even aware that the handler is part of a chain.
  */
  function clientCode(handler: Handler) {
    const foods = ['Nut', 'Banana', 'Cup of coffee'];

    for (const food of foods) {
      console.log(`Client: Who wants a ${food}?`);

      const result = handler.handle(food);
      if (result) {
        console.log(`  ${result}`);
      } else {
        console.log(`  ${food} was left untouched.`);
      }
    }
  }

  /**
  * The other part of the client code constructs the actual chain.
  */
  const monkey = new MonkeyHandler();
  const squirrel = new SquirrelHandler();
  const dog = new DogHandler();

  monkey.setNext(squirrel).setNext(dog);

  /**
  * The client should be able to send a request to any handler, not just the
  * first one in the chain.
  */
  console.log('Chain: Monkey > Squirrel > Dog\n');
  clientCode(monkey);
  console.log('');

  console.log('Subchain: Squirrel > Dog\n');
  clientCode(squirrel);

}