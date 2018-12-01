
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/Resources', express.static(path.join(__dirname, '../Resources')));

app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, '../Web/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Resources/dist/error.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
