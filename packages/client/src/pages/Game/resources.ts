interface ResourceCache {
  [key: string]: HTMLImageElement | boolean
}

interface Resources {
  load: (urlOrArr: string | string[]) => void
  get: (url: string) => HTMLImageElement | boolean
  onReady: (func: () => void) => void
  isReady: () => boolean
}

;(function () {
  const resourceCache: ResourceCache = {}
  //const loading: string[] = []
  const readyCallbacks: Array<() => void> = []

  // Load an image url or an array of image urls
  function load(urlOrArr: string | string[]): void {
    if (Array.isArray(urlOrArr)) {
      urlOrArr.forEach(function (url: string) {
        _load(url)
      })
    } else {
      _load(urlOrArr)
    }
  }

  function _load(url: string): void {
    if (resourceCache[url]) {
      return
    } else {
      const img = new Image()
      img.onload = function () {
        resourceCache[url] = img

        if (isReady()) {
          readyCallbacks.forEach(func => func())
        }
      }
      resourceCache[url] = false
      img.src = url
    }
  }

  function get(url: string): HTMLImageElement | boolean {
    return resourceCache[url]
  }

  function isReady(): boolean {
    return Object.values(resourceCache).every(resource => resource !== false)
  }

  function onReady(func: () => void): void {
    readyCallbacks.push(func)
  }

  ;(window as any).resources = {
    load,
    get,
    onReady,
    isReady,
  } as Resources
})()
