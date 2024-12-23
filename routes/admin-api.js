const express = require("express");
const router = express.Router();
const OrderController = require("@/app/Http/Controllers/AdminApi/OrderController");
const ProductController = require("@/app/Http/Controllers/AdminApi/ProductController");
const ProductCollectionController = require("@/app/Http/Controllers/AdminApi/ProductCollectionController");
const SettingController = require("@/app/Http/Controllers/AdminApi/SettingController");
const AuthController = require("@/app/Http/Controllers/AdminApi/AuthController");
const SaleReportController = require("@/app/Http/Controllers/AdminApi/SaleReportController");
const CustomerController = require("@/app/Http/Controllers/AdminApi/CustomerController");

/**
 * Middleware
 */
const JwtAuth = require("@/app/Http/Middleware/JwtAuth");
const RequiredAuth = require("@/app/Http/Middleware/RequiredAuth");

/**
 * Apply jwt middleware for all storefront api routes
 */
router.use(JwtAuth);

/**
 * ------------------------
 * Setting routes
 * ------------------------
 */
router.get("/settings", (req, res) => SettingController.index(req, res));

/**
 * ------------------------
 * Auth routes
 * ------------------------
 */
router.post("/auth/login", (req, res) => AuthController.login(req, res));

/**
 * All routes from here are protected
 */
router.use(RequiredAuth);

router.get("/auth/me", (req, res) => AuthController.me(req, res));
router.delete("/auth/logout", (req, res) => AuthController.logout(req, res));

/**
 * ------------------------
 * Order routes
 * ------------------------
 */
router.get("/orders", (req, res) => OrderController.index(req, res));
router.post("/orders", (req, res) => OrderController.create(req, res));
router.get("/orders/:orderNumber", (req, res) =>
  OrderController.show(req, res)
);
router.put("/orders/:orderNumber/line-items", (req, res) =>
  OrderController.updateItems(req, res)
);
router.put("/orders/:orderNumber", (req, res) =>
  OrderController.updateWhenOrderIsUnpaid(req, res)
);

/**
 * ------------------------
 * Product routes
 * ------------------------
 */
router.get("/products", (req, res) => ProductController.index(req, res));
router.get("/products/collections", (req, res) =>
  ProductCollectionController.index(req, res)
);
router.get("/products/:group", (req, res) => ProductController.show(req, res));

/**
 * ------------------------
 * Customer routes
 * ------------------------
 */
router.get("/customers", (req, res) =>
  CustomerController.index(req, res)
);

/**
 * ------------------------
 * Report routes
 * ------------------------
 */
router.get("/reports/sale-report", (req, res) =>
  SaleReportController.index(req, res)
);

module.exports = router;
