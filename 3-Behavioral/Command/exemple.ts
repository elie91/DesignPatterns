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


  // The base command class defines the common interface for all concrete commands.
  abstract class Command {
    protected app: Application;
    protected editor: Editor;
    protected backup: string;

    constructor(app: Application, editor: Editor) {
      this.app = app;
      this.editor = editor;
    }

    // Make a backup of the editor's state.
    public saveBackup() {
      this.backup = this.editor.text
    }

    // Restore the editor's state.
    public undo() {
      this.editor.text = this.backup
    }

    // The execution method is declared abstract to force all
    // concrete commands to provide their own implementations.
    // The method must return true or false depending on whether
    // the command changes the editor's state.
    public abstract execute(): boolean;
  }

  // The editor class has actual text editing operations. It plays
  // the role of a receiver: all commands end up delegating
  // execution to the editor's methods.
  class Editor {
    public text: string;

    public getSelection(): string {
      // return selected text
      return 'Selected text'
    }

    public deleteSelection(): void {
      // Delete selected text
    }

    public replaceSelection(text: string): void {
      // Insert the clipboard's contents at the current position.
    }
  }

  // The concrete commands go here.
  class CopyCommand extends Command {
    // The copy command isn't saved to the history since it doesn't change the editor's state.
    public execute(): boolean {
      this.app.clipboard = this.editor.getSelection();
      return false;
    }
  }

  class CutCommand extends Command {
    // The cut command does change the editor's state, therefore
    // it must be saved to the history. And it'll be saved as
    // long as the method returns true.
    public execute(): boolean {
      this.saveBackup();
      this.app.clipboard = this.editor.getSelection();
      this.editor.deleteSelection();
      return true;
    }
  }

  class PasteCommand extends Command {
    public execute(): boolean {
      this.saveBackup();
      this.editor.replaceSelection(this.app.clipboard)
      return true;
    }
  }


  class UndoCommand extends Command {
    public execute(): boolean {
      this.undo();
      return false;
    }
  }


  // The global command history is just a stack.
  class CommandHistory {
    private history: Command[];

    // Push the command to the end of the history array.
    public pushIn(c: Command): void {
      this.history.push(c);
    }

    // Get the most recent command from the history.
    public popOut(): Command | undefined {
      return this.history.pop();
    }
  }

  // The application class sets up object relations. It acts as a
  // sender: when something needs to be done, it creates a command
  // object and executes it.
  class Application {
    public clipboard: string
    public editors: Editor[];
    public activeEditor: Editor;
    public history: CommandHistory;

    // The code which assigns commands to UI objects may look like this.
    public createUI() {
      const copy = () => {
        this.executeCommand(new CopyCommand(this, this.activeEditor));
      }
      const cut = () => {
        this.executeCommand(new CutCommand(this, this.activeEditor));
      }
      const paste = () => {
        this.executeCommand(new PasteCommand(this, this.activeEditor));
      }
      const undo = () => {
        this.executeCommand(new UndoCommand(this, this.activeEditor));
      }
      // copyButton.setCommand(copy)
      // shortcuts.onKeyPress("Ctrl+C", copy)
      //cutButton.setCommand(cut)
      //shortcuts.onKeyPress("Ctrl+X", cut)
      //pasteButton.setCommand(paste)
      //shortcuts.onKeyPress("Ctrl+V", paste)
      //undoButton.setCommand(undo)
      //shortcuts.onKeyPress("Ctrl+Z", undo)
    }


    // Execute a command and check whether it has to be added to the history.
    public executeCommand(command: Command) {
      this.history.pushIn(command);
    }

    // Take the most recent command from the history and run its
    // undo method. Note that we don't know the class of that
    // command. But we don't have to, since the command knows
    // how to undo its own action.
    public undo() {
      const command = this.history.popOut();
      if (command) {
        command.undo();
      }
    }
  }
}