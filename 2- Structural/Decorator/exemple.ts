/*
https://refactoring.guru/design-patterns/decorator

Decorator is a structural pattern that allows adding new behaviors to objects dynamically 
by placing them inside special wrapper objects that contain the behaviors.

Using decorators you can wrap objects countless number of times since both target objects and decorators follow the same interface. 
The resulting object will get a stacking behavior of all wrappers.

-> Use the Decorator pattern when you need to be able to assign extra behaviors to objects at runtime without breaking the code that uses these objects.
-> Use the pattern when it’s awkward or not possible to extend an object’s behavior using inheritance

Usage examples: 
The Decorator is pretty standard in TypeScript code, especially in code related to streams.

Identification: 
Decorator can be recognized by creation methods or constructor that accept objects of the same class 
or interface as a current class.

Complexity: 2/3
Popularity: 2/3
*/
namespace DecoratorExempleNamespace {


  /**
   * Base Component interface
   */
  interface INotifier {
    send(message: string): void;
  }

  class Notifier implements INotifier {
    send(message: string): void {
      console.log(`Notifier: sending and notifiy users with message : ${message}`)
    }
  }

  /**
   * Base Decorator
   */
  class NotifierDecorator implements INotifier {
    protected notifier: INotifier;

    constructor(notifier: INotifier) {
      this.notifier = notifier
    }

    send(message: string): void {
      return this.notifier.send(message);
    }
  }

  class EmailDecorator extends NotifierDecorator {
    send(message: string): void {
      console.log('im sending email');
      super.send(message);
    }
  }
  class SmsDecorator extends NotifierDecorator {
    send(message: string): void {
      console.log('im sending SMS message');
      super.send(message);
    }
  }

  class FacebookDecorator extends NotifierDecorator {
    send(message: string): void {
      console.log('im sending Facebook notification');
      super.send(message);
    }
  }

  class SlackDecorator extends NotifierDecorator {
    send(message: string): void {
      console.log('im sending Slack notification');
      super.send(message);
    }
  }


  function clientCode(notifier: INotifier) {
    notifier.send('Client code : ');
  }

  let notifier = new Notifier();
  notifier = new SlackDecorator(notifier);
  notifier = new FacebookDecorator(notifier);
  notifier = new SmsDecorator(notifier);
  notifier = new EmailDecorator(notifier);

  clientCode(notifier);
}