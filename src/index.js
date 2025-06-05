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
  try {
    const res = await fetch('/api/notify');
    const data = await res.json();
    console.log("Verificação concluída:", data);
  } catch (err) {
    console.error("Erro ao chamar o backend:", err);
  }
}, 60000); // a cada 60 segundos