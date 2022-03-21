namespace BuilderExoNamespace {

  class House {
    hasWall: boolean;
    hasDoors: boolean;
    hasWindows: boolean;
    hasRoof: boolean;
    hasGarage: boolean;

    public getConfig(): string {
      return `
        hasWall: ${this.hasWall || false},
        hasDoors: ${this.hasDoors || false},
        hasWindows: ${this.hasWindows || false},
        hasRoof: ${this.hasRoof || false},
        hasGarage: ${this.hasGarage || false},
      `
    }
  }

  interface Builder {
    buildWalls(): void;
    buildDoors(): void;
    buildWindows(): void;
    buildRoof(): void;
    buildGarage(): void;
    reset(): void;
  }

  class HouseBuilder implements Builder {
    private house: House;

    constructor() {
      this.reset();
    }

    public reset(): void {
      this.house = new House();
    }

    public buildWalls(): void {
      this.house.hasWall = true;
    }

    public buildDoors(): void {
      this.house.hasDoors = true;
    }

    public buildWindows(): void {
      this.house.hasWindows = true;
    }

    public buildRoof(): void {
      this.house.hasRoof = true;
    }

    public buildGarage(): void {
      this.house.hasGarage = true;
    }

    public getHouse(): House {
      const result = this.house;
      this.reset();
      return result;
    }
  }

  class Director {
    private builder: Builder;

    public setBuilder(builder: Builder) {
      this.builder = builder;
    }

    public buildFullHouse(): void {
      this.builder.buildWalls();
      this.builder.buildGarage();
      this.builder.buildDoors();
      this.builder.buildRoof();
      this.builder.buildWindows();
    }

    public buildMinimalHouse(): void {
      this.builder.buildWalls();
      this.builder.buildDoors();
      this.builder.buildRoof();
    }
  }


  function clientCode(director: Director) {

    const builder = new HouseBuilder();
    director.setBuilder(builder);

    //create minimal house
    console.log('minimal house')
    director.buildMinimalHouse();
    console.log(builder.getHouse().getConfig());

    //create full house
    console.log('full house')
    director.buildFullHouse();
    console.log(builder.getHouse().getConfig());

    console.log('custom house');
    builder.buildDoors();
    builder.buildGarage();
    console.log(builder.getHouse().getConfig());
  }

  clientCode(new Director());

}

