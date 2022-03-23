/*

https://refactoring.guru/design-patterns/adapter

Adapter is a structural design pattern, which allows incompatible objects to collaborate.

The Adapter acts as a wrapper between two objects. 
It catches calls for one object and transforms them to format and interface recognizable by the second object

The Adapter pattern is pretty common in TypeScript code. 
It’s very often used in systems based on some legacy code. 
In such cases, Adapters make legacy code work with modern classes.

Adapter is recognizable by a constructor which takes an instance of a different abstract/interface type. 
When the adapter receives a call to any of its methods, it translates parameters to the appropriate format 
and then directs the call to one or several methods of the wrapped object.

Complexity: 1/3
Popularity: 3/3
*/
namespace AdapterExempeNamespace {

  class CoreClass {
    public displayXML(xmlContent: string): string {
      return `CoreClass: I Work only with XML: ${xmlContent}`
    }
  }

  class AnalyticsLibrary {
    public displayJSON(jsonContent: string): string {
      return `AnalyticsLibrary: I display only JSON : ${jsonContent}`;
    }
  }

  class XMLToJSONAdapter extends CoreClass {
    private library: AnalyticsLibrary;

    constructor(library: AnalyticsLibrary) {
      super();
      this.library = library;
    }

    public displayXML(xmlContent: string): string {
      // Transform xml into JSON
      const jsonContent = xmlContent.replace('xml', 'json')
      return this.library.displayJSON(jsonContent)
    }
  }

  function clientCode(coreClass: CoreClass) {
    const xmlContent = 'test xml content'
    console.log(coreClass.displayXML(xmlContent))
  }

  const coreClass = new CoreClass();
  clientCode(coreClass);

  const analyticsLibrary = new AnalyticsLibrary();
  const adapter = new XMLToJSONAdapter(analyticsLibrary);
  clientCode(adapter);

}