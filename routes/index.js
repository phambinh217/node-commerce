var express = require('express');
var router = express.Router();
const OrderController = require('../app/Http/Controllers/OrderController');

/* GET home page. */
router.get('/', OrderController.index);

module.exports = router;
