# 🌐 J_emmons_07 Site Proxy

This is a secure, customizable Node.js proxy server designed to relay website content through a hosted backend (e.g. [Render](https://render.com)). It acts as a filterable and controlled gateway for users to view websites via a frontend (such as a GitHub Pages form) while ensuring certain content is blocked for legal, ethical, or policy-based reasons.

---

## 🚀 Features

- ✅ Host your own web proxy (no public proxies used)
- 🔒 Blocks pornographic, pirated, or illegal websites via keyword/domain matching
- 🧠 Easy-to-edit external blocklist (`blocklist.js`)
- 🌍 CORS-enabled for frontend integration (like GitHub Pages)
- ⚡ Lightweight and fast (based on `express` and `node-fetch`)

---

## 📁 Project Structure

```
site-proxies/
├── server.js         # Express-based backend with proxy logic
├── blocklist.js      # Externalized blocklist of disallowed terms/domains
├── package.json      # Project dependencies and start script
```

---

## 📦 Setup & Deployment

### 🖥 Local Dev

```bash
git clone https://github.com/jemmonsss/site-proxies.git
cd site-proxies
npm install
node server.js
```

### 🌐 Render Hosting

1. Push this repo to GitHub
2. Create a **Web Service** on [Render](https://render.com/)
3. Set the following Render configuration:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** `Node.js 18+`
4. Done! Your proxy will be available at:

```
https://your-render-name.onrender.com/proxy?url=https://example.com
```

---

## 📜 Example Frontend (HTML)

Use the following example with GitHub Pages to launch the proxy:

```html
<input id="urlInput" placeholder="https://example.com" />
<button onclick="launch()">Go</button>
<script>
  async function launch() {
    const url = document.getElementById('urlInput').value;
    const res = await fetch('https://your-render-url.onrender.com/proxy?url=' + encodeURIComponent(url));
    const html = await res.text();
    const win = window.open();
    win.document.write(html);
    win.document.close();
  }
</script>
```

---

## ⛔ Blocklist Filtering

Domains and keywords are filtered based on the list in `blocklist.js`.

Examples of blocked categories:
- ❌ Adult content (pornography, cam sites)
- ❌ Piracy (torrent sites, streaming scrapers)
- ❌ Malware/phishing/cracks
- ❌ Deep web / dark net / illegal marketplaces

You can freely edit `blocklist.js` to add/remove entries.

---

## 🔐 Security Notes

- This proxy fetches and relays full HTML from the target site.
- Content is **not sanitized** — use responsibly.
- Always filter URLs to avoid legal risk or abuse.

---

## 📄 License

MIT — Free to use and modify. Use at your own risk.
