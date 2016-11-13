var express = require('express')
  , router = express.Router();

router.use('/data', require('./users'));

module.exports = router;
