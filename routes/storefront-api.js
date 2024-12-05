const express = require("express");
const router = express.Router();
const OrderController = require("../app/Http/Controllers/StorefrontApi/OrderController");

/**
 * ------------------------
 * Order routes
 * ------------------------
 */
router.get("/orders", OrderController.index);
router.post("/orders", OrderController.store);

router.get("/test", async function (req, res) {
  //
});

module.exports = router;
