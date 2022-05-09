/*

https://refactoring.guru/design-patterns/iterator

Iterator is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).

Iterator is a behavioral design pattern that allows sequential traversal through a complex data structure without exposing its internal details.
Thanks to the Iterator, clients can go over elements of different collections in a similar fashion using a single iterator interface.

-> Use the Iterator pattern when your collection has a complex data structure under the hood, but you want to hide its complexity from clients (either for convenience or security reasons).
-> Use the pattern to reduce duplication of the traversal code across your app.
-> Use the Iterator when you want your code to be able to traverse different data structures or when types of these structures are unknown beforehand.

Usage examples: 
The pattern is very common in TypeScript code. 
Many frameworks and libraries use it to provide a standard way for traversing their collections.

Identification: 
Iterator is easy to recognize by the navigation methods (such as next, previous and others). 
Client code that uses iterators might not have direct access to the collection being traversed.


Complexity: 2/3
Popularity: 3/3
*/


namespace IteratorExempleNamespace {

  interface Profile {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  }

  /*
    The collection interface must declare a factory method for
    producing iterators. You can declare several methods if there
    are different kinds of iteration available in your program.
  */
  interface SocialNetwork {
    createFriendsIterator(profileId: string): ProfileIterator
    createCoworkersIterator(profileId: string): ProfileIterator
  }


  /*
    Each concrete collection is coupled to a set of concrete
    iterator classes it returns. But the client isn't, since the
    signature of these methods returns iterator interfaces.
  */
  class Facebook implements SocialNetwork {
    // ... The bulk of the collection's code should go here ...

    socialGraphRequest(profileId: string, type: string): Profile[] {
      console.log('facebook request', profileId, type);
      return [{
        id: '1',
        firstname: 'Elie',
        lastname: 'Bismuth',
        email: 'elie@gmail.com'
      }]
    }

    createFriendsIterator(profileId: string): ProfileIterator {
      return new FacebookIterator(this, profileId, "friends")
    }

    createCoworkersIterator(profileId: string): ProfileIterator {
      return new FacebookIterator(this, profileId, "coworkers")
    }
  }


  // The common interface for all iterators.
  interface ProfileIterator {
    getNext(): Profile | undefined;
    hasMore(): boolean;
  }

  // The concrete iterator class.
  class FacebookIterator implements ProfileIterator {
    // The iterator needs a reference to the collection that it traverses.
    private facebook: Facebook
    private profileId: string;
    private type: string

    // An iterator object traverses the collection independently
    // from other iterators. Therefore it has to store the iteration state.
    private currentPosition: number;
    private cache: Profile[];

    constructor(facebook: Facebook, profileId: string, type: string) {
      this.facebook = facebook;
      this.profileId = profileId;
      this.type = type;
    }

    private lazyInit() {
      if (!this.cache) {
        this.cache = this.facebook.socialGraphRequest(this.profileId, this.type)
      }
    }

    // Each concrete iterator class has its own implementation of the common iterator interface.
    getNext(): Profile | undefined {
      if (this.hasMore()) {
        this.currentPosition++;
        return this.cache[this.currentPosition]
      }
    }

    hasMore(): boolean {
      this.lazyInit();
      return this.currentPosition < this.cache.length;
    }
  }


  /* 
   Here is another useful trick: you can pass an iterator to a
   client class instead of giving it access to a whole
   collection. This way, you don't expose the collection to the
   client.
  
   And there's another benefit: you can change the way the
   client works with the collection at runtime by passing it a
   different iterator. This is possible because the client code
   isn't coupled to concrete iterator classes.
  */
  class SocialSpammer {
    send(iterator: ProfileIterator, message: string) {
      while (iterator.hasMore()) {
        const profile = iterator.getNext()
        // System.sendEmail(profile.getEmail(), message)
      }
    }
  }


  // The application class configures collections and iterators
  // and then passes them to the client code.
  class Application {
    private network: SocialNetwork;
    private spammer: SocialSpammer;

    config() {
      if ('facebook') {
        this.network = new Facebook();
      }

      if ('linkedin') {
        // this.network = new Linkedin()
      }

      this.spammer = new SocialSpammer();
    }

    sendSpamToFriends(profile: Profile) {
      const iterator = this.network.createFriendsIterator(profile.id);
      this.spammer.send(iterator, "Very important message");
    }

    sendSpamToCoworkers(profile: Profile) {
      const iterator = this.network.createCoworkersIterator(profile.id);
      this.spammer.send(iterator, "Very important message");
    }
  }

  const application = new Application();
  application.config();
}