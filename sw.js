// Service worker mínimo: lo necesario para que Android permita "Instalar app".
// No guarda copias de datos. Las páginas se revalidan siempre con el servidor,
// así una versión nueva publicada llega a los usuarios sin quedarse atascada en caché.
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request, { cache: "no-cache" }).catch(() => fetch(e.request)));
  } else {
    e.respondWith(fetch(e.request));
  }
});
