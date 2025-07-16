const { JSDOM } = require('jsdom');
const blockedDomains = require('./blocklist'); // your existing list

function sanitizeHtmlSafely(rawHtml) {
  const dom = new JSDOM(rawHtml);
  const doc = dom.window.document;

  // Remove script tags from known bad domains
  doc.querySelectorAll('script[src]').forEach(script => {
    const src = script.getAttribute('src');
    if (isBlocked(src)) script.remove();
  });

  // Remove iframes from dangerous domains
  doc.querySelectorAll('iframe[src]').forEach(iframe => {
    const src = iframe.getAttribute('src');
    if (isBlocked(src)) iframe.remove();
  });

  // Remove forms that post to dangerous URLs
  doc.querySelectorAll('form[action]').forEach(form => {
    const action = form.getAttribute('action');
    if (isBlocked(action)) form.remove();
  });

  return dom.serialize();
}

function isBlocked(url) {
  if (!url) return false;
  const lower = url.toLowerCase();
  return blockedDomains.some(term => lower.includes(term));
}

module.exports = sanitizeHtmlSafely;
