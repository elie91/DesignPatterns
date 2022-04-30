/*

https://refactoring.guru/design-patterns/adapter

Bridge is a structural design pattern that divides business logic or huge class 
into separate class hierarchies that can be developed independently.

One of these hierarchies (often called the Abstraction) will get a reference to an object 
of the second hierarchy (Implementation). 

The abstraction will be able to delegate some (sometimes, most) of its calls to the implementations object. 
Since all implementations will have a common interface, they’d be interchangeable inside the abstraction.

-> Use the Bridge pattern when you want to divide and organize a monolithic class 
that has several variants of some functionality (for example, if the class can work with various database servers).
-> Use the pattern when you need to extend a class in several orthogonal (independent) dimensions.
-> Use the Bridge if you need to be able to switch implementations at runtime.

Usage examples: 
The Bridge pattern is especially useful when dealing with cross-platform apps, 
supporting multiple types of database servers or working with several API providers of a certain kind 
(for example, cloud platforms, social networks, etc.)

Identification: 
Bridge can be recognized by a clear distinction between some controlling entity and several different 
platforms that it relies on.

Complexity: 3/3
Popularity: 1/3

*/


namespace BridgeExoNamespace {

  // L’interface de l’implémentation
  interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(percent: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
  }


  /*
    L’« abstraction » définit l’interface pour la partie
    « télécommande » des deux hiérarchies de classes. Elle garde
    une référence sur un objet de la hiérarchie de
    l’« implémentation » et lui délègue les tâches.
  */
  class RemoteControl {
    private device: Device;

    constructor(device: Device) {
      this.device = device;
    }

    togglePower(): void {
      if (this.device.isEnabled()) {
        this.device.enable()
      } else {
        this.device.disable();
      }
    }

    volumeDown() {
      this.device.setVolume(this.device.getVolume() - 10);
    }

    volumeUp() {
      this.device.setVolume(this.device.getVolume() + 10);
    }

    channelDown() {
      this.device.setChannel(this.device.getChannel() - 1)
    }

    channelUp() {
      this.device.setChannel(this.device.getChannel() + 1)
    }
  }

  //Concrete Implementation
  class TV implements Device {
    isEnabled(): boolean {
      throw new Error("Method not implemented.");
    }
    enable(): void {
      throw new Error("Method not implemented.");
    }
    disable(): void {
      throw new Error("Method not implemented.");
    }
    getVolume(): number {
      throw new Error("Method not implemented.");
    }
    setVolume(percent: number): void {
      throw new Error("Method not implemented.");
    }
    getChannel(): number {
      throw new Error("Method not implemented.");
    }
    setChannel(channel: number): void {
      throw new Error("Method not implemented.");
    }

  }

  //Concrete Implementation
  class Radio implements Device {
    isEnabled(): boolean {
      throw new Error("Method not implemented.");
    }
    enable(): void {
      throw new Error("Method not implemented.");
    }
    disable(): void {
      throw new Error("Method not implemented.");
    }
    getVolume(): number {
      throw new Error("Method not implemented.");
    }
    setVolume(percent: number): void {
      throw new Error("Method not implemented.");
    }
    getChannel(): number {
      throw new Error("Method not implemented.");
    }
    setChannel(channel: number): void {
      throw new Error("Method not implemented.");
    }

  }

  function clientCode() {

    const tv = new TV();
    const radio = new Radio();

    const tvRemote = new RemoteControl(tv);
    const radioRemote = new RemoteControl(radio);

    tvRemote.togglePower();
    radioRemote.togglePower();

    tvRemote.channelUp();
    radioRemote.channelUp();

    tvRemote.volumeUp();
    radioRemote.volumeUp();


  }

  clientCode();
}