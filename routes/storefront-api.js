const express = require("express");
const router = express.Router();
const OrderController = require("@/app/Http/Controllers/StorefrontApi/OrderController");
const ProductController = require("@/app/Http/Controllers/StorefrontApi/ProductController");

/**
 * ------------------------
 * Order routes
 * ------------------------
 */
router.get("/orders", (req, res) => OrderController.index(req, res));
router.post("/orders", (req, res) => OrderController.store(req, res));

/**
 * ------------------------
 * Product routes
 * ------------------------
 */
router.get("/products", (req, res) => ProductController.index(req, res));

module.exports = router;
