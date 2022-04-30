/*

https://refactoring.guru/design-patterns/proxy

Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. 
A proxy controls access to the original object, allowing you to perform something either 
before or after the request gets through to the original object.

Proxy is a structural design pattern that provides an object that acts as a substitute for a real service object used by a client. 
A proxy receives client requests, does some work (access control, caching, etc.) 
and then passes the request to a service object.

The proxy object has the same interface as a service, 
which makes it interchangeable with a real object when passed to a client.

->  Lazy initialization (virtual proxy). 
This is when you have a heavyweight service object that wastes system resources by being always up, even though you only need it from time to time.
->  Access control (protection proxy). 
This is when you want only specific clients to be able to use the service object; for instance, when your objects are crucial parts of an operating system and clients are various launched applications (including malicious ones).
-> Local execution of a remote service (remote proxy). 
This is when the service object is located on a remote server.
->  Logging requests (logging proxy). 
This is when you want to keep a history of requests to the service object.
-> Caching request results (caching proxy). 
This is when you need to cache results of client requests and manage the life cycle of this cache, especially if results are quite large.
->  Smart reference. 
This is when you need to be able to dismiss a heavyweight object once there are no clients that use it.

Résumé: 
Virtual Proxy
Protection Proxy
Remote Proxy
Loggin Proxy
Caching Proxy
Smart Reference

Usage examples: 
While the Proxy pattern isn’t a frequent guest in most TypeScript applications, it’s still very handy in some special cases. 
It’s irreplaceable when you want to add some additional behaviors to an object of some existing class 
without changing the client code.

Identification: 
Proxies delegate all of the real work to some other object. Each proxy method should, 
in the end, refer to a service object unless the proxy is a subclass of a service.

Complexity: 2/3
Popularity: 1/3
*/

// Caching Proxy
namespace ProxyExempleNamespace {

  interface Video {
    id: number;
    title: string;
    duration: number;
  }

  interface ThirdPartyYouTubeLib {
    listVideos(): Video[];
    getVideoInfo(id: number): Video
    downloadVideo(id: number): Video
  }

  // Request information from YouTube
  // The application will slow down if a lot of requests are fired at the same time
  class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
    listVideos(): Video[] {
      console.log('Send an API request to YouTube.')
      return [{
        id: 1,
        title: 'test',
        duration: 2000
      }]
    }
    getVideoInfo(id: number): Video {
      console.log('Get metadata about some video.')
      return {
        id: 1,
        title: 'test',
        duration: 2000
      }
    }
    downloadVideo(id: number): Video {
      console.log(' Download a video file from YouTube.')
      return {
        id: 1,
        title: 'test',
        duration: 2000
      }
    }
  }

  // To save some bandwidth, we can cache request results and keep
  // them for some time. But it may be impossible to put such code
  // directly into the service class. For example, it could have
  // been provided as part of a third party library and/or defined
  // as `final`. That's why we put the caching code into a new
  // proxy class which implements the same interface as the
  // service class. It delegates to the service object only when
  // the real requests have to be sent.
  class CachedYouTubeClass implements ThirdPartyYouTubeLib {

    private service: ThirdPartyYouTubeLib;
    private listCache: Video[];
    private videoCache: Video;
    private downloads: Video[];
    private needReset: boolean;

    constructor(service: ThirdPartyYouTubeLib) {
      this.service = service;
    }

    listVideos(): Video[] {
      if (!this.listCache || this.needReset) {
        this.listCache = this.service.listVideos();
      }
      return this.listCache;
    }
    getVideoInfo(id: number): Video {
      if (!this.videoCache || this.needReset) {
        this.videoCache = this.service.getVideoInfo(id);
      }
      return this.videoCache;
    }
    downloadVideo(id: number): Video {
      const existing = this.downloads.find(v => v.id === id);
      if (!existing || this.needReset) {
        this.service.downloadVideo(id);
      }
      return existing!;
    }
  }

  // The GUI class, which used to work directly with a service
  // object, stays unchanged as long as it works with the service
  // object through an interface. We can safely pass a proxy
  // object instead of a real service object since they both
  // implement the same interface.
  class YouTubeManager {

    protected service: ThirdPartyYouTubeLib

    constructor(service: ThirdPartyYouTubeLib) {
      this.service = service
    }

    renderVideoPage(id: number): Video {
      return this.service.getVideoInfo(id)
    }

    renderListPanel(): Video[] {
      return this.service.listVideos()
    }

    reactOnUserInput() {
      this.renderVideoPage(1)
      this.renderListPanel()
    }

  }

  function clientCode() {
    const YouTubeService = new ThirdPartyYouTubeClass()
    const YouTubeProxy = new CachedYouTubeClass(YouTubeService)
    const manager = new YouTubeManager(YouTubeProxy)
    manager.reactOnUserInput()
  }

  clientCode();
}