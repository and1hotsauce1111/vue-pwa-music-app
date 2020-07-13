importScripts("/vue-pwa-music-app/precache-manifest.f2fd838e3648051be708a4fce27d0ff9.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

if (workbox) {
  console.log(`Workbox is loaded`)
  workbox.precaching.precacheAndRoute(self.__precacheManifest)
} else {
  console.log(`Workbox didn't load`)
}

workbox.core.setCacheNameDetails({
  prefix: 'browse-exp',
  suffix: 'v1.0.0'
})
workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

workbox.routing.registerRoute(
  new RegExp('/styles/.*\\.css'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  new RegExp('/(https?://)(.*)/api/(.*)/'),
  workbox.strategies.staleWhileRevalidate()
)

