import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBht5tWY2DmqgsxduXsBDLFfpeTdOo9U2U",
  authDomain: "live-bts.firebaseapp.com",
  projectId: "live-bts",
  storageBucket: "live-bts.appspot.com",
  messagingSenderId: "299732282682",
  appId: "1:299732282682:web:a9d5bf8ab76195e3437403"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };