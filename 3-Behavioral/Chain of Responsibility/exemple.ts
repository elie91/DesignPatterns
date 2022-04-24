namespace ChainOfResponsibilityExempleNamespace {

  interface Request {
    isAuthenticated: boolean;
    isAdmin: boolean;
    body: { item: string, price: string }
    ipAdress: string;
  }
  interface Handler {
    setNext(handler: Handler): Handler;

    handle(request: Request): boolean
  }

  abstract class AbstractHandler implements Handler {
    private nextHandler: Handler;

    setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
    }

    handle(request: Request): boolean {
      if (this.nextHandler) {
        return this.nextHandler.handle(request);
      }
      return true;
    }
  }

  class AuthenticationHandler extends AbstractHandler {
    public handle(request: Request): boolean {
      if (!request.isAuthenticated) {
        console.log('Denied access, user not authenticated')
        return false
      }
      return super.handle(request);
    }
  }

  class AuthorizationHandler extends AbstractHandler {
    public handle(request: Request): boolean {
      if (!request.isAdmin) {
        console.log('Denied access, permission failed')
        return false
      }
      return super.handle(request);
    }
  }

  class ValidationHandler extends AbstractHandler {
    public handle(request: Request): boolean {
      if (!request.body.item || !request.body.price) {
        console.log('Validation failed')
        return false
      }
      return super.handle(request);
    }
  }

  class IPAdressHandler extends AbstractHandler {
    public handle(request: Request): boolean {
      const blacklisted_address = ['104.31.2.164']
      if (blacklisted_address.find(address => address === request.ipAdress)) {
        console.log('Blacklisted IP Address')
        return false
      }
      return super.handle(request);
    }
  }


  function clientCode(handler: Handler, request: Request) {
    const isValid = handler.handle(request);
    if (isValid) {
      console.log("Request valid, we can now process the order")
    }
  }

  const authentication = new AuthenticationHandler();
  const authorization = new AuthorizationHandler();
  const validation = new ValidationHandler();
  const ipAdressHandler = new IPAdressHandler();

  authentication
    .setNext(authorization)
    .setNext(validation)
    .setNext(ipAdressHandler)

  const request: Request = {
    isAuthenticated: true,
    isAdmin: true,
    body: { item: 'test', price: '100' },
    ipAdress: '107.77.194.36'
  }

  clientCode(authentication, request)

  const request2: Request = {
    isAuthenticated: true,
    isAdmin: false,
    body: { item: 'test', price: '100' },
    ipAdress: '107.77.194.36'
  }

  clientCode(authentication, request2)
}