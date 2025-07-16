const launchBtn = document.getElementById('launchBtn');
const statusDiv = document.getElementById('status');
const urlInput = document.getElementById('urlInput');

launchBtn.onclick = async () => {
  const raw = urlInput.value.trim();

  if (!/^https?:\/\//.test(raw)) {
    statusDiv.textContent = '⚠️ Please enter a valid URL starting with http:// or https://';
    return;
  }

  statusDiv.textContent = '🔄 Connecting to proxy...';

  try {
    const res = await fetch('https://site-proxies.onrender.com/proxy?url=' + encodeURIComponent(raw));

    if (!res.ok) {
      const error = await res.json();
      statusDiv.textContent = `❌ Blocked or Failed: ${error.error || 'Unknown error.'}`;
      return;
    }

    const content = await res.text();

    const win = window.open();
    if (win) {
      win.document.open();
      win.document.write(content);
      win.document.close();
    } else {
      statusDiv.textContent = '❌ Pop-up blocked. Please allow pop-ups.';
    }
  } catch (err) {
    statusDiv.textContent = '❌ Network error. Check console for details.';
    console.error(err);
  }
};
