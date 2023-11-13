import CONFIG from '../globals/config';
import NotifWebSocket from './notif-websocket';

const WebSocketInitiator = {
  init(url) {
    const socket = new WebSocket(url);
    socket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    const parseNotif = JSON.parse(message.data);
    console.log('tahapan sudah sampai _onmeesagehandler');
    NotifWebSocket.sendNotification({
      title: parseNotif.title,
      options: {
        body: parseNotif.description,
        icon: '/favicon.png',
        image: '/icons/icon-512.png',
      },
    });
  },
};

const sendNotiftoWebsocket = (data) => {
  NotifWebSocket.sendNotification({
    title: data.title,
    options: {
      body: data.body,
      icon: '/icons/icon-512.png',
      image: CONFIG.SMALL_IMAGE_URL + data.image,
    },
  });
};

export { WebSocketInitiator, sendNotiftoWebsocket };
