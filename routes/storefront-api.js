const express = require("express");
const router = express.Router();
const OrderController = require("../app/Http/Controllers/StorefrontApi/OrderController");
const InitSheetDatabase = require("@/app/Actions/InitSheetDatabase");

/**
 * ------------------------
 * Order routes
 * ------------------------
 */
router.get("/orders", OrderController.index);
router.post("/orders", OrderController.store);

router.get("/test", async function (req, res) {
  const r = await InitSheetDatabase.make({
    name: 'Hello World',
    email: 'phambinh217@gmail.com',
  }).execute();

  const sheetId = r.spreadsheetId;
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}`;

  return res.json({
    success: true,
    sheetUrl: sheetUrl
  });
});

module.exports = router;
