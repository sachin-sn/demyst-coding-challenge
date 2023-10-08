const express = require("express");
const router = express.Router();
const LoanApp = require("./application"); // Import the Note model

// Create a new note
router.post("/loanapp", async (req, res) => {
  try {
    const { title, content } = req.body;
    const la = new LoanApp({ title, content });
    await la.save();
    res.json(la);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a note" });
  }
});

// Get all notes
router.get("/loanapp", async (req, res) => {
  try {
    const las = await LoanApp.find();
    res.json(las);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve notes" });
  }
});

module.exports = router;
