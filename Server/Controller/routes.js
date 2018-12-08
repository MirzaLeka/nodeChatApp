
const router = require('express').Router();
const path = require('path');

const distPath = path.join(__dirname, '../../Resources/dist');

router.get(['/', '/login', '/home'], (req, res) => {
  res.sendFile(path.join(distPath, '/index.html'));
});

router.get('/chat', (req, res) => {
  res.sendFile(path.join(distPath, '/chat.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(distPath, '/error.html'));
});

module.exports = router;
