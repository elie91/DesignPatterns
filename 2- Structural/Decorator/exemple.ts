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