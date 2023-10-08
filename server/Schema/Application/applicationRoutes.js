const express = require("express");
const router = express.Router();
const { getApplication, newApplication } = require("./applicationService");
const Log = require("../../Log");

// Create a new loan application
router.post("/new", async (req, res) => {
  try {
    const { application } = req.body;
    const res = await newApplication(application);
    return res;
  } catch (error) {
    Log("new loan application", error);
    res.status(500).json({ error: "Failed to create a loan application" });
  }
});

// Get matching loanApplication
router.get("/get", async (req, res) => {
  try {
    const { id } = req.query.id;
    const application = await getApplication(id);
    return application;
  } catch (error) {
    Log("get loan application", error);
    res.status(500).json({ error: "Failed to retrieve loan application" });
  }
});

module.exports = router;
