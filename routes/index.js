var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  return res.json({
    message: 'Welcome to Node Commerce - A headless commerce platform'
  })
});

module.exports = router;
