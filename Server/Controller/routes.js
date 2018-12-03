
const router = require('express').Router();
const path = require('path');

const distPath = path.join(__dirname, '../../Resources/dist');

router.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(distPath, '/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(distPath, '/login.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(distPath, '/error.html'));
});

module.exports = router;
