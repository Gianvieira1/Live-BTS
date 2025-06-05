import { useEffect } from 'react';
import { messaging, getToken, onMessage } from './firebase/config';

function App() {
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID
        }).then((token) => {
          console.log("FCM Token:", token);
        });
      }
    });

    onMessage(messaging, (payload) => {
      console.log("Push recebida em foreground:", payload);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🔔 Notificador de Lives BTS</h1>
      <p>Você receberá notificações quando uma live começar.</p>
    </div>
  );
}

export default App;