const CACHE = "sistem-aprantisaj-v1";

self.addEventListener(
  "install",
  event => {
    self.skipWaiting();

    event.waitUntil(
      caches
        .open(CACHE)
        .then(
          cache =>
            cache.add(
              "./index_firebase_corrige.html"
            )
        )
    );
  }
);

self.addEventListener(
  "activate",
  event =>
    event.waitUntil(
      self.clients.claim()
    )
);

self.addEventListener(
  "fetch",
  event => {

    if(
      event.request.method !== "GET"
    )
      return;

    event.respondWith(

      fetch(event.request)
        .catch(
          () =>
            caches.match(
              event.request
            )
        )

    );

  }
);
