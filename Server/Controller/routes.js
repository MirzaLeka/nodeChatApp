
const router = require('express').Router();
const path = require('path');
const os = require('os');

const distPath = path.join(__dirname, '../../Resources/dist');

router.get(['/', '/login', '/home'], (req, res) => {
  res.sendFile(path.join(distPath, '/index.html'));
});

router.get('/chat', (req, res) => {
  res.sendFile(path.join(distPath, '/chat.html'));
});

router.get('/health', (req, res) => {

  const healthCheck = {
    app: {
      uptime: `${process.uptime().toFixed(2)}s`,
      message: 'OK',
      status: 200,
    },
    os: {
      platform: os.platform(),
      totalMemory: `${os.totalmem()}B`,
      freeMemory: `${os.freemem()}B`,
      cpus: os.cpus()
    }
  }

  try {
    res.send(healthCheck);
  } catch(e) {
    res.send({ message: e.message, status: e.status })
  }
});

router.get('*', (req, res) => {
  res.sendFile(path.join(distPath, '/error.html'));
});

module.exports = router;
