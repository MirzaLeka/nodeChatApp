
const router = require('express').Router();

router.get('/users', (req, res) => {

  const obj = {
    language: 'JS'
  };

  res.send(obj);

});

module.exports = router;
