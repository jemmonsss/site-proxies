// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const proxies = [
  u => `https://4everproxy.com/browse.php?u=${encodeURIComponent(u)}&b=4`,
  u => `https://proxysite.com/go.php?u=${encodeURIComponent(u)}&b=4`
];

app.get('/api/launch', (req, res) => {
  const { url } = req.query;
  if (!url || !/^https?:\/\//.test(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  const proxyUrl = proxies[Math.floor(Math.random() * proxies.length)](url);
  res.json({ proxyUrl });
});

app.listen(PORT, () => console.log(`Proxy API running on port ${PORT}`));
