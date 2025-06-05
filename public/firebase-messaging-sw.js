importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBht5tWY2DmqgsxduXsBDLFfpeTdOo9U2U",
  authDomain: "live-bts.firebaseapp.com",
  projectId: "live-bts",
  storageBucket: "live-bts.appspot.com",
  messagingSenderId: "299732282682",
  appId: "1:299732282682:web:a9d5bf8ab76195e3437403"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  const notificationOptions = {
    body,
    icon: '/logo.png',
  };

  self.registration.showNotification(title, notificationOptions);
});