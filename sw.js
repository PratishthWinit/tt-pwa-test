self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data.json(); } catch { d = { body: e.data?.text() }; }
  e.waitUntil(Promise.all([
    self.registration.showNotification(d.title || 'TAMTAM', { body: d.body || '', icon: 'icon-180.png' }),
    d.badge != null && self.navigator.setAppBadge ? self.navigator.setAppBadge(d.badge) : null,
  ]));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window' }).then((w) => (w[0] ? w[0].focus() : clients.openWindow('./'))));
});
