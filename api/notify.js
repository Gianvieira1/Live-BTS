const admin = require("firebase-admin");
const axios = require("axios");

const serviceAccount = {
  "type": "service_account",
  "project_id": "live-bts",
  "private_key_id": process.env.FIREBASE_PRIVATE_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\\\n/g, '\\n'),
  "client_email": process.env.FIREBASE_PRIVATE_EMAIL,
  "client_id": process.env.FIREBASE_PRIVATE_CLIENTID,
  "auth_uri": process.env.FIREBASE_PRIVATE_AUTH,
  "token_uri": process.env.FIREBASE_PRIVATE_TOKEN,
  "auth_provider_x509_cert_url": process.env.FIREBASE_PRIVATE_AUTH_PROVIDER,
  "client_x509_cert_url":  process.env.FIREBASE_PRIVATE_X509,
  "universe_domain": "googleapis.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlZjI2Mzg5NmU4OGQ0OTY1OTQyYzg0MjFmZTc1YTE1MDoxIiwic3ViIjoiZjY4ODRjMjhlY2ZjNGQwOTg1MWEwMWZiZDIzZWIyZGU0ODEiLCJpYXQiOjE3NDkxMzk2MzEsImV4cCI6MTc0OTM5ODgzMSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50YXBpLndldmVyc2UuaW8vd2ViIiwiYXVkIjoiaHR0cHM6Ly9hY2NvdW50YXBpLndldmVyc2UuaW8iLCJ2ZXIiOjIsImNsaWVudF9pZCI6IndldmVyc2UiLCJwbGF0Zm9ybSI6IldFQiIsInNvY2lhbC5wcm92aWRlciI6IkdPT0dMRSIsInNvY2lhbC51aWQiOjQ0MTEzMDQ4fQ.zCX9ot0nfg7VIgwt69-8m_ynC0D2CwCTajSCFkXHGbs';

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
    console.error("Erro ao enviar notificação:", error);
    res.status(500).json({ error: "Erro ao enviar notificação" });
  }
};