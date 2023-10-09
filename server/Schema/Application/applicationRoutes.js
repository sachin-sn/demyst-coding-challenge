const express = require("express");
const router = express.Router();
const {
  getApplication,
  newApplication,
  getApplications,
  updateApplication,
} = require("./applicationService");
const { log } = require("../../Log");

// Create a new loan application
router.post("/new", async (req, res) => {
  try {
    const { application } = req.body;
    const result = await newApplication(application);
    res.send({
      application: result,
    });
  } catch (error) {
    log("new loan application", error);
    res.status(500).json({ error: "Failed to create a loan application" });
  }
});

// Create a update loan application
router.post("/update", async (req, res) => {
  try {
    const { application } = req.body;
    const result = await updateApplication(application);
    res.send({
      application: result,
    });
  } catch (error) {
    log("new loan application", error);
    res.status(500).json({ error: "Failed to create a loan application" });
  }
});

// Get matching loanApplication
router.get("/get", async (req, res) => {
  try {
    const id = req.query.id;
    const application = await getApplication(id);
    res.send({
      application,
    });
  } catch (error) {
    log("get loan application", error);
    res.status(500).json({ error: "Failed to retrieve loan application" });
  }
});

// Get all matching loanApplication
router.get("/getall", async (req, res) => {
  try {
    const email = req.query.email;
    const applications = await getApplications(email);
    res.send({
      applications,
    });
  } catch (error) {
    log("get loan application", error);
    res.status(500).json({ error: "Failed to retrieve loan application" });
  }
});

module.exports = router;
