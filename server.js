const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || !/^https?:\/\//.test(targetUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const proxyRes = await fetch(targetUrl);
    const contentType = proxyRes.headers.get('content-type') || 'text/plain';
    res.setHeader('content-type', contentType);
    const body = await proxyRes.text();
    res.send(body);
  } catch (err) {
    res.status(500).json({ error: 'Proxy failed', details: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy server running on port ${PORT}`));
