const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {

  res.json({
    mensagem: 'Login funcionando!'
  });

});

module.exports = router;