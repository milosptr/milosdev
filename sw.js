/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-1f716520d88489c01aa2.js"
  },
  {
    "url": "app-a048c9e1ea2cfd513273.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-7ea0da21b50a96fac10c.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "20a311423465fc2e0a1652df30267a1f"
  },
  {
    "url": "google-fonts/s/montserrat/v13/JTUPjIg1_i6t8kCHKm459WxZFgrz_PZw.woff2",
    "revision": "60789af1c9338ed1a9546722ec54b4f7"
  },
  {
    "url": "google-fonts/s/montserrat/v13/JTUQjIg1_i6t8kCHKm459WxRyS7m.woff2",
    "revision": "5cad650422a7184467af5a4d17b264c4"
  },
  {
    "url": "google-fonts/s/montserrat/v13/JTURjIg1_i6t8kCHKm45_aZA3gnD_g.woff2",
    "revision": "85d5ef9db7f2dc6979172a4a3b2c57cb"
  },
  {
    "url": "google-fonts/s/montserrat/v13/JTURjIg1_i6t8kCHKm45_bZF3gnD_g.woff2",
    "revision": "6fb1b5623e528e27c18658fecf5ee0ee"
  },
  {
    "url": "google-fonts/s/montserrat/v13/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2",
    "revision": "39d93cf678c740f9f6b2b1cfde34bee3"
  },
  {
    "url": "google-fonts/s/montserrat/v13/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2",
    "revision": "bc3aa95dca08f5fee5291e34959c27bc"
  },
  {
    "url": "1-b2827b57c9f598d23a6f.js"
  },
  {
    "url": "component---src-pages-404-js-63514e468193b7656c88.js"
  },
  {
    "url": "0-98687a927cdf38d9ffe8.js"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "a4821dc212a67d2132ed0a3d0aaece8a"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "11558ea5a727bb9d0a9b60553adfa833"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "e64aec3191ad4292107ae883c0803d2b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, workbox.strategies.staleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */

importScripts(`idb-keyval-iife.min.js`)
const WHITELIST_KEY = `custom-navigation-whitelist`

const navigationRoute = new workbox.routing.NavigationRoute(({ event }) => {
  const { pathname } = new URL(event.request.url)

  return idbKeyval.get(WHITELIST_KEY).then((customWhitelist = []) => {
    // Respond with the offline shell if we match the custom whitelist
    if (customWhitelist.includes(pathname)) {
      const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
      const cacheName = workbox.core.cacheNames.precache

      return caches.match(offlineShell, { cacheName }).then(cachedResponse => {
        if (cachedResponse) return cachedResponse

        console.error(
          `The offline shell (${offlineShell}) was not found ` +
            `while attempting to serve a response for ${pathname}`
        )

        return fetch(offlineShell).then(response => {
          if (response.ok) {
            return caches.open(cacheName).then(cache =>
              // Clone is needed because put() consumes the response body.
              cache.put(offlineShell, response.clone()).then(() => response)
            )
          } else {
            return fetch(event.request)
          }
        })
      })
    }

    return fetch(event.request)
  })
})

workbox.routing.registerRoute(navigationRoute)

let updatingWhitelist = null

function rawWhitelistPathnames(pathnames) {
  if (updatingWhitelist !== null) {
    // Prevent the whitelist from being updated twice at the same time
    return updatingWhitelist.then(() => rawWhitelistPathnames(pathnames))
  }

  updatingWhitelist = idbKeyval
    .get(WHITELIST_KEY)
    .then((customWhitelist = []) => {
      pathnames.forEach(pathname => {
        if (!customWhitelist.includes(pathname)) customWhitelist.push(pathname)
      })

      return idbKeyval.set(WHITELIST_KEY, customWhitelist)
    })
    .then(() => {
      updatingWhitelist = null
    })

  return updatingWhitelist
}

function rawResetWhitelist() {
  if (updatingWhitelist !== null) {
    return updatingWhitelist.then(() => rawResetWhitelist())
  }

  updatingWhitelist = idbKeyval.set(WHITELIST_KEY, []).then(() => {
    updatingWhitelist = null
  })

  return updatingWhitelist
}

const messageApi = {
  whitelistPathnames(event) {
    let { pathnames } = event.data

    pathnames = pathnames.map(({ pathname, includesPrefix }) => {
      if (!includesPrefix) {
        return `${pathname}`
      } else {
        return pathname
      }
    })

    event.waitUntil(rawWhitelistPathnames(pathnames))
  },

  resetWhitelist(event) {
    event.waitUntil(rawResetWhitelist())
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi } = event.data
  if (gatsbyApi) messageApi[gatsbyApi](event)
})
