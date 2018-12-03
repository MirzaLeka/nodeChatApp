
const express = require('express');
const path = require('path');
const controller = require('./Controller/controller');

const app = express();
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, '../Resources/dist');

/* Middlewares */

app.use('/Resources', express.static(path.join(__dirname, '../Resources')));

app.use(express.static(distPath, {
  extensions: ['html', 'htm']
}));

app.use(controller);


app.get(['/', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, '../Resources/dist/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Resources/dist/error.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
