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
