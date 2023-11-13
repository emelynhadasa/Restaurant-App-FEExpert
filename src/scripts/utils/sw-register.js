import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in the browser');
    return;
  }
  const wb = new Workbox('./sw.js');

  wb.addEventListener('waiting', () => {
    console.log('Service worker waiting to install');
  });

  wb.addEventListener('activated', (event) => {
    if (!event.isUpdate) {
      console.log('Service worker activated ');
    }
  });
  wb.register();
};

export default swRegister;
