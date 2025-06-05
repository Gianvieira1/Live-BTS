const admin = require("firebase-admin");
const axios = require("axios");

const serviceAccount = {
  type: "service_account",
  project_id: "live-bts",
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const BEARER_TOKEN = process.env.WEVERSE_BEARER;

module.exports = async (req, res) => {
  try {
    const response = await axios.get("https://weverse.io/api/v1/notifications", {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });

    const notifications = response.data || [];
    const latest = notifications[0];

    if (latest && latest.type === "LIVE") {
      const payload = {
        notification: {
          title: `🔴 Live no Weverse!`,
          body: `${latest.actor.name} começou uma live.`,
        },
        topic: "bts-lives"
      };

      await admin.messaging().send(payload);
    }

    res.status(200).json({ status: "checked", notified: true });
  } catch (error) {
    console.error("Erro ao enviar notificação:", error.message);
    res.status(500).json({ error: "Erro ao enviar notificação" });
  }
};