/*

https://refactoring.guru/design-patterns/composye

Composite is a structural design pattern that lets you compose objects into tree structures 
and then work with these structures as if they were individual objects.

-> Use the Composite pattern when you have to implement a tree-like object structure.
-> Use the pattern when you want the client code to treat both simple and complex elements uniformly.

Usage examples: 
The Composite pattern is pretty common in TypeScript code. 
It’s often used to represent hierarchies of user interface components or the code that works with graphs.

Identification: 
If you have an object tree, and each object of a tree is a part of the same class hierarchy, 
this is most likely a composite. 
If methods of these classes delegate the work to child objects of the tree and do it via the base class/interface of the hierarchy, 
this is definitely a composite.

Complexity: 2/3
Popularity: 2/3
*/


namespace CompositeExoNamespace {

}