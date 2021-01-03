
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
  res.send({
    appUptime: `${process.uptime().toFixed(2)}s`,
    message: 'OK',
    status: 200,
    OS: {
      osType: os.type(),
      hostname: os.hostname(),
      architecture: os.arch(),
      platform: os.platform(),
      version: os.version(),
      release: os.release(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      osUptime: os.uptime(),
      cpus: {
        size: os.cpus.length,
        cpus: os.cpus()
      },
    }
  })
});

router.get('*', (req, res) => {
  res.sendFile(path.join(distPath, '/error.html'));
});

module.exports = router;
