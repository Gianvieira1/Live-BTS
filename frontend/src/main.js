import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBht5tWY2DmqgsxduXsBDLFfpeTdOo9U2U",
  authDomain: "live-bts.firebaseapp.com",
  projectId: "live-bts",
  storageBucket: "live-bts.firebasestorage.app",
  messagingSenderId: "299732282682",
  appId: "1:299732282682:web:a9d5bf8ab76195e3437403"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

getToken(messaging, { vapidKey: "BP9xDc2HOtXBRvSeJRaoPsh1ISYQ7O1stQ932w302PDji-nXckKRya9caOlWDhJm9tBNJhtE2lVCYwuLgdGpvfk" }).then((currentToken) => {
  if (currentToken) {
    console.log("Token recebido:", currentToken);
  } else {
    console.warn("Nenhum token disponível. Solicite permissão para gerar um.");
  }
});

onMessage(messaging, (payload) => {
  console.log("Mensagem recebida: ", payload);
});