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


namespace IteratorNamespace {

  /**
   * Iterator Design Pattern
   *
   * Intent: Lets you traverse elements of a collection without exposing its
   * underlying representation (list, stack, tree, etc.).
   */

  interface Iterator<T> {
    // Return the current element.
    current(): T;

    // Return the current element and move forward to next element.
    next(): T;

    // Return the key of the current element.
    key(): number;

    // Checks if current position is valid.
    valid(): boolean;

    // Rewind the Iterator to the first element.
    rewind(): void;
  }

  interface Aggregator {
    // Retrieve an external iterator.
    getIterator(): Iterator<string>;
  }

  /**
  * Concrete Iterators implement various traversal algorithms. These classes
  * store the current traversal position at all times.
  */

  class AlphabeticalOrderIterator implements Iterator<string> {
    private collection: WordsCollection;

    /**
     * Stores the current traversal position. An iterator may have a lot of
     * other fields for storing iteration state, especially when it is supposed
     * to work with a particular kind of collection.
     */
    private position: number = 0;

    /**
     * This variable indicates the traversal direction.
     */
    private reverse: boolean = false;

    constructor(collection: WordsCollection, reverse: boolean = false) {
      this.collection = collection;
      this.reverse = reverse;

      if (reverse) {
        this.position = collection.getCount() - 1;
      }
    }

    public rewind() {
      this.position = this.reverse ?
        this.collection.getCount() - 1 :
        0;
    }

    public current(): string {
      return this.collection.getItems()[this.position];
    }

    public key(): number {
      return this.position;
    }

    public next(): string {
      const item = this.collection.getItems()[this.position];
      this.position += this.reverse ? -1 : 1;
      return item;
    }

    public valid(): boolean {
      if (this.reverse) {
        return this.position >= 0;
      }

      return this.position < this.collection.getCount();
    }
  }

  /**
  * Concrete Collections provide one or several methods for retrieving fresh
  * iterator instances, compatible with the collection class.
  */
  class WordsCollection implements Aggregator {
    private items: string[] = [];

    public getItems(): string[] {
      return this.items;
    }

    public getCount(): number {
      return this.items.length;
    }

    public addItem(item: string): void {
      this.items.push(item);
    }

    public getIterator(): Iterator<string> {
      return new AlphabeticalOrderIterator(this);
    }

    public getReverseIterator(): Iterator<string> {
      return new AlphabeticalOrderIterator(this, true);
    }
  }

  /**
  * The client code may or may not know about the Concrete Iterator or Collection
  * classes, depending on the level of indirection you want to keep in your
  * program.
  */
  const collection = new WordsCollection();
  collection.addItem('First');
  collection.addItem('Second');
  collection.addItem('Third');

  const iterator = collection.getIterator();

  console.log('Straight traversal:');
  while (iterator.valid()) {
    console.log(iterator.next());
  }

  console.log('');
  console.log('Reverse traversal:');
  const reverseIterator = collection.getReverseIterator();
  while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
  }
}

/*
Output: 

Straight traversal:
First
Second
Third

Reverse traversal:
Third
Second
First

*/