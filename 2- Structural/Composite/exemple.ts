/*

https://refactoring.guru/design-patterns/composite

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

// https://dev.to/coly010/the-composite-pattern-design-patterns-meet-the-frontend-445e

namespace CompositCodeExoNamespace {

  interface Instruction {
    name: string;
    execute(): boolean;
  }

  abstract class SingleInstruction implements Instruction {
    name: string;

    constructor(name: string) {
      this.name = name;
    }

    abstract execute(): boolean;
  }

  class LogInstruction extends SingleInstruction {
    log: string;

    constructor(name: string, log: string) {
      super(name);
      this.log = log;
    }

    execute() {
      console.log(`${this.name}: ${this.log}`);
      return true;
    }
  }


  class CompositeInstructionSet implements Instruction {
    // Our composite instruction should have children
    // that can be any implementation of Instruction
    private children: Instruction[] = [];

    name: string;

    constructor(name: string) {
      this.name = name;
    }

    execute() {
      let successful = false;

      // We'll iterate through our children calling their execute method
      // We don't need to know if our child is a Composite Instruction Set
      // or just a SingleInstruction
      for (const child of this.children) {
        successful = child.execute();

        // If any of the child tasks fail, lets fail this one
        if (!successful) {
          return false;
        }
      }

      return true;
    }

    // Our CompositeInstructionSet needs a public API to manage it's children
    addChild(child: Instruction) {
      this.children.push(child);
    }

    removeChild(child: Instruction) {
      this.children = this.children.filter(c => c.name !== child.name);
    }
  }

  class TaskRunner {
    tasks: Instruction[];

    constructor(tasks: Instruction[]) {
      this.tasks = tasks;
    }

    runTasks() {
      for (const task of this.tasks) {
        task.execute();
      }
    }
  }

  function main() {
    const startUpLogInstruction = new LogInstruction('Starting', 'Task runner booting up...');

    const compositeInstruction = new CompositeInstructionSet('Composite');
    const firstSubTask = new LogInstruction('Composite 1', 'The first sub task');
    const secondSubTask = new LogInstruction('Composite 1', 'The second sub task');
    compositeInstruction.addChild(firstSubTask);
    compositeInstruction.addChild(secondSubTask);

    const compositeInstruction2 = new CompositeInstructionSet('Composite2');
    const firstSubTask2 = new LogInstruction('Composite 2', 'The first sub task');
    const secondSubTask2 = new LogInstruction('Composite 2', 'The second sub task');
    compositeInstruction2.addChild(firstSubTask2);
    compositeInstruction2.addChild(secondSubTask2);

    compositeInstruction.addChild(compositeInstruction2);

    const taskRunner = new TaskRunner([startUpLogInstruction, compositeInstruction]);

    taskRunner.runTasks();
  }

  main();



}