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