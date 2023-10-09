const express = require("express");
const router = express.Router();

const { log } = require("../../Log");
const {
  generateBalanceSheetFromMYOB,
  generateBalanceSheetFromXERO,
} = require("./accountingService");

// Generate balance sheet using myob
router.get("/myob", async (req, res) => {
  try {
    const balanceSheet = generateBalanceSheetFromMYOB();
    res.send({
      balanceSheet,
    });
  } catch (error) {
    log("get balance sheet xero", error);
    res.status(500).json({ error: "Failed to balance sheet xero" });
  }
});

// Generate balance sheet using xero
router.get("/xero", async (req, res) => {
  try {
    const balanceSheet = generateBalanceSheetFromXERO();
    res.send({
      balanceSheet,
    });
  } catch (error) {
    log("get balance sheet xero", error);
    res.status(500).json({ error: "Failed to balance sheet xero" });
  }
});

module.exports = router;
