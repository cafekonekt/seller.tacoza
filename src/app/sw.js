import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners('push', function (event) {
  const data = event.data.json();
  console.log('Push event received', data);
  const title = data.title || 'Notification';
  const options = {
    body: data.body,
    icon: '/pwa/icon512_rounded.png', // Set your app icon path here
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
