const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const url = require('url');
const BLOCKED = require('./blocklist');
const sanitizeHtmlSafely = require('./sanitizeHtmlSafely'); // ← add this

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

function isBlocked(targetUrl) {
  const parsed = url.parse(targetUrl);
  const hostname = parsed.hostname || '';
  const fullUrl = targetUrl.toLowerCase();
  return BLOCKED.some(term =>
    hostname.includes(term) || fullUrl.includes(term)
  );
}

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || !/^https?:\/\//.test(targetUrl)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  if (isBlocked(targetUrl)) {
    return res.status(403).json({ error: 'This domain is blocked.' });
  }

  try {
    const proxyRes = await fetch(targetUrl);
    const contentType = proxyRes.headers.get('content-type') || '';

    if (!contentType.includes('text/html')) {
      return res.status(415).send('Only HTML pages can be proxied.');
    }

    const rawHtml = await proxyRes.text();

    const cleaned = sanitizeHtmlSafely(rawHtml); // ✨ selectively cleaned
    res.setHeader('Content-Type', 'text/html');
    res.send(cleaned);
  } catch (err) {
    res.status(500).json({ error: 'Proxy fetch failed', details: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));
