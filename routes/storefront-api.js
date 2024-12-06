const express = require("express");
const router = express.Router();
const OrderController = require("../app/Http/Controllers/StorefrontApi/OrderController");

/**
 * ------------------------
 * Order routes
 * ------------------------
 */
router.get("/orders", (req, res) => OrderController.index(req, res));
router.post("/orders", (req, res) => OrderController.create(req, res));
router.get("/orders/:id", (req, res) => OrderController.show(req, res));

module.exports = router;
