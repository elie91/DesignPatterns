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


namespace DecoratorNamespace {


}