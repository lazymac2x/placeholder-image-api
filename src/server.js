const express = require('express');
const cors = require('cors');
const { generatePlaceholder, generateAvatar, generatePattern } = require('./generator');

const app = express();
const PORT = process.env.PORT || 4700;

app.use(cors());

// ── Health ───────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'placeholder-image-api', version: '1.0.0' });
});

// ── Helpers ──────────────────────────────────────────────────────────
function sendSvg(res, svg) {
  res.set('Content-Type', 'image/svg+xml');
  res.set('Cache-Control', 'public, max-age=86400');
  res.send(svg);
}

// ── Avatar ───────────────────────────────────────────────────────────
app.get('/api/v1/avatar/:initials', (req, res) => {
  const { initials } = req.params;
  const { bg, fg, size, font } = req.query;
  const svg = generateAvatar({ initials, bg, fg, size, fontSize: font });
  sendSvg(res, svg);
});

// ── Pattern ──────────────────────────────────────────────────────────
app.get('/api/v1/pattern/:width/:height', (req, res) => {
  const { width, height } = req.params;
  const { bg, fg, pattern, rounded } = req.query;
  const svg = generatePattern({ width, height, bg, fg, pattern, rounded });
  sendSvg(res, svg);
});

// ── Placeholder with custom text in path ─────────────────────────────
app.get('/api/v1/:width/:height/:text', (req, res) => {
  const { width, height, text } = req.params;
  const { bg, fg, rounded, font, gradient } = req.query;
  const svg = generatePlaceholder({ width, height, bg, fg, text, rounded, fontSize: font, gradient });
  sendSvg(res, svg);
});

// ── Basic placeholder ────────────────────────────────────────────────
app.get('/api/v1/:width/:height', (req, res) => {
  const { width, height } = req.params;
  const { bg, fg, text, rounded, font, gradient } = req.query;
  const svg = generatePlaceholder({ width, height, bg, fg, text, rounded, fontSize: font, gradient });
  sendSvg(res, svg);
});

// ── Start ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`placeholder-image-api running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/v1/400/300?bg=3498db&fg=ffffff`);
});
