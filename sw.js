// Service worker mínimo: solo lo necesario para que Android permita "Instalar app".
// No cachea nada de forma agresiva, para evitar que los clientes vean datos viejos.
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  // Deja pasar todas las peticiones directo a la red (sin caché de datos de Firebase).
  e.respondWith(fetch(e.request));
});
