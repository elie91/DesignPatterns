/*

https://refactoring.guru/design-patterns/flyweight

Flyweight is a structural design pattern that lets you fit more objects into the available amount of RAM 
by sharing common parts of state between multiple objects instead of keeping all of the data in each object.

he pattern achieves it by sharing parts of object state between multiple objects. 
In other words, the Flyweight saves RAM by caching the same data used by different objects.

-> Use the Flyweight pattern only when your program must support a huge number of objects 
which barely fit into available RAM.

Usage examples: 
The Flyweight pattern has a single purpose: minimizing memory intake. 
If your program doesn’t struggle with a shortage of RAM, then you might just ignore this pattern for a while.

Identification: 
Flyweight can be recognized by a creation method that returns cached objects instead of creating new.

Complexity: 3/3
Popularity: 0/3
*/


namespace FlyweightNamespace {


}