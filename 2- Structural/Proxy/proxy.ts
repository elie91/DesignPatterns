/*

https://refactoring.guru/design-patterns/proxy

Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. 
A proxy controls access to the original object, allowing you to perform something either 
before or after the request gets through to the original object.

Proxy is a structural design pattern that provides an object that acts as a substitute for a real service object used by a client. 
A proxy receives client requests, does some work (access control, caching, etc.) 
and then passes the request to a service object.

The proxy object has the same interface as a service, 
which makes it interchangeable with a real object when passed to a client.

->  Lazy initialization (virtual proxy). 
This is when you have a heavyweight service object that wastes system resources by being always up, even though you only need it from time to time.
->  Access control (protection proxy). 
This is when you want only specific clients to be able to use the service object; for instance, when your objects are crucial parts of an operating system and clients are various launched applications (including malicious ones).
-> Local execution of a remote service (remote proxy). 
This is when the service object is located on a remote server.
->  Logging requests (logging proxy). 
This is when you want to keep a history of requests to the service object.
-> Caching request results (caching proxy). 
This is when you need to cache results of client requests and manage the life cycle of this cache, especially if results are quite large.
->  Smart reference. 
This is when you need to be able to dismiss a heavyweight object once there are no clients that use it.

Résumé: 
Virtual Proxy
Protection Proxy
Remote Proxy
Loggin Proxy
Caching Proxy
Smart Reference

Usage examples: 
While the Proxy pattern isn’t a frequent guest in most TypeScript applications, it’s still very handy in some special cases. 
It’s irreplaceable when you want to add some additional behaviors to an object of some existing class 
without changing the client code.

Identification: 
Proxies delegate all of the real work to some other object. Each proxy method should, 
in the end, refer to a service object unless the proxy is a subclass of a service.

Complexity: 2/3
Popularity: 1/3
*/


namespace ProxyNamespace {

  /**
   * The Subject interface declares common operations for both RealSubject and the
   * Proxy. As long as the client works with RealSubject using this interface,
   * you'll be able to pass it a proxy instead of a real subject.
   */
  interface Subject {
    request(): void;
  }

  /**
  * The RealSubject contains some core business logic. Usually, RealSubjects are
  * capable of doing some useful work which may also be very slow or sensitive -
  * e.g. correcting input data. A Proxy can solve these issues without any
  * changes to the RealSubject's code.
  */
  class RealSubject implements Subject {
    public request(): void {
      console.log('RealSubject: Handling request.');
    }
  }

  /**
  * The Proxy has an interface identical to the RealSubject.
  */
  class Proxy implements Subject {
    private realSubject: RealSubject;

    /**
     * The Proxy maintains a reference to an object of the RealSubject class. It
     * can be either lazy-loaded or passed to the Proxy by the client.
     */
    constructor(realSubject: RealSubject) {
      this.realSubject = realSubject;
    }

    /**
     * The most common applications of the Proxy pattern are lazy loading,
     * caching, controlling the access, logging, etc. A Proxy can perform one of
     * these things and then, depending on the result, pass the execution to the
     * same method in a linked RealSubject object.
     */
    public request(): void {
      if (this.checkAccess()) {
        this.realSubject.request();
        this.logAccess();
      }
    }

    private checkAccess(): boolean {
      // Some real checks should go here.
      console.log('Proxy: Checking access prior to firing a real request.');

      return true;
    }

    private logAccess(): void {
      console.log('Proxy: Logging the time of request.');
    }
  }

  /**
  * The client code is supposed to work with all objects (both subjects and
  * proxies) via the Subject interface in order to support both real subjects and
  * proxies. In real life, however, clients mostly work with their real subjects
  * directly. In this case, to implement the pattern more easily, you can extend
  * your proxy from the real subject's class.
  */
  function clientCode(subject: Subject) {
    // ...

    subject.request();

    // ...
  }

  console.log('Client: Executing the client code with a real subject:');
  const realSubject = new RealSubject();
  clientCode(realSubject);

  console.log('');

  console.log('Client: Executing the same client code with a proxy:');
  const proxy = new Proxy(realSubject);
  clientCode(proxy);
}