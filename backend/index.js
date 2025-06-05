
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/live-status', (req, res) => {
  const mockData = {
    jungkook: false,
    taehyung: false,
    jimin: true,
    jin: false,
    rm: false,
    suga: false,
    jhope: false,
    bts_official: true
  };
  res.json(mockData);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
