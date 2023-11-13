const NotifWebSocket = {
  sendNotification({ title, options }) {
    const isAvailable = this._checkAvailability();
    const isPermitted = isAvailable && this._checkPermission();

    if (!isAvailable) {
      console.info('Notification not supported in this environment');
      return;
    }

    if (!isPermitted) {
      console.info('User did not yet grant permission');
      this._requestPermission();
      return;
    }

    this._showNotification({ title, options });
  },

  _checkAvailability() {
    return typeof Notification !== 'undefined' && Boolean(Notification);
  },

  _checkPermission() {
    return Notification.permission === 'granted';
  },

  async _requestPermission() {
    if (typeof Notification === 'undefined') {
      console.warn('Notification not supported in this environment');
      return;
    }

    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.error('Notification Denied');
    }

    if (status === 'default') {
      console.warn('Permission closed');
    }
  },

  async _showNotification({ title, options }) {
    if (typeof Notification === 'undefined') {
      console.warn('Notification not supported in this environment');
      return;
    }

    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.showNotification(title, options);
  },
};

export default NotifWebSocket;
