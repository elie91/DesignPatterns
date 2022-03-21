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