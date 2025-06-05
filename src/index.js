import { getToken, onMessage, messaging } from './firebase/config';
import {{ getWeverseNotifications }} from './api/weverse';

function requestNotificationPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      getToken(messaging, { vapidKey: "BP9xDc2HOtXBRvSeJRaoPsh1ISYQ7O1stQ932w302PDji-nXckKRya9caOlWDhJm9tBNJhtE2lVCYwuLgdGpvfk" }).then((currentToken) => {
        if (currentToken) {
          console.log("Token:", currentToken);
        }
      });
    }
  });
}

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

requestNotificationPermission();

setInterval(async () => {
  const data = await getWeverseNotifications();
  console.log("New notifications:", data);
  // Aqui poderia acionar backend via fetch('/api/notify', ...) para enviar push
}, 60000);