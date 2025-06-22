const STATIC_CACHE_NAME = "static_v1";
const DYNAMIC_CACHE_NAME = "dinamic_v1";
const ASSETS_TO_CACHE = [
  "/",
  "./index.html",
  "./public/offline.html",
  "./public/icons/142x142.png",
];

self.addEventListener("install", async () => {
  console.log("Service Worker installing.");

  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(ASSETS_TO_CACHE);
});

self.addEventListener("activate", async (event) => {
  console.log("Service Worker activating.");
  const cahesKeysArr = await caches.keys();
  await Promise.all(
    cahesKeysArr
      .filter((key) => {
        return key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME;
      })
      .map((key) => {
        return caches.delete(key);
      })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  try {
    return (
      cached ??
      (await fetch(request).then((response) => {
        return networkFirst(request);
      }))
    );
  } catch (error) {
    return networkFirst(request);
  }
}

async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    return cachedResponse ?? (await caches.match("./offline.html"));
  }
}
