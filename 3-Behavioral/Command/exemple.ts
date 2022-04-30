/*

https://refactoring.guru/design-patterns/command

Command is a behavioral design pattern that turns a request into a stand-alone object 
that contains all information about the request. 
This transformation lets you pass requests as a method arguments, delay or queue a request’s execution, 
and support undoable operations

-> Use the Command pattern when you want to parametrize objects with operations.
-> Use the Command pattern when you want to queue operations, schedule their execution, or execute them remotely.
-> Use the Command pattern when you want to implement reversible operations.

Usage examples: 
The Command pattern is pretty common in TypeScript code. Most often it’s used as an alternative 
for callbacks to parameterizing UI elements with actions. 
It’s also used for queueing tasks, tracking operations history, etc.

Identification: 
The Command pattern is recognizable by behavioral methods in an abstract/interface type (sender) 
which invokes a method in an implementation of a different abstract/interface type (receiver) 
which has been encapsulated by the command implementation during its creation. 
Command classes are usually limited to specific actions.


Complexity: 1/3
Popularity: 3/3
*/


namespace CommandExempleNamespace {


}