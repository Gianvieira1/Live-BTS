import axios from 'axios';

const BEARER_TOKEN = Process.env.BEARER_TOKEN // Cortado por segurança

export async function getWeverseNotifications() {
  const res = await axios.get('https://weverse.io/api/v1/notifications', {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  });
  return res.data;
}