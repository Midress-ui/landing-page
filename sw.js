const CACHE_NAME = "sua-empresa-cache-v1";
const ASSETS = [
  "/index.html",
  "/styles.css",
  "/manifest.json",
  "URL_DA_IMAGEM",
  "URL_DA_IMAGEM_ICON_192x192",
  "URL_DA_IMAGEM_ICON_512x512"
];

// Instalar o Service Worker e armazenar os recursos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Cache aberto.");
      return cache.addAll(ASSETS);
    })
  );
});

// Ativar o Service Worker e limpar caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Removendo cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptar requisições e servir arquivos do cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
