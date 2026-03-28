self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});

self.addEventListener("fetch", (event) => {
  // 기본 캐시 없음 (간단 버전)
});