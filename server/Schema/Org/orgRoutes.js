const express = require("express");
const router = express.Router();
const orginzation = require("./org"); // Import the org model

// Get all notes
router.get("/org?:id", async (req, res) => {
  try {
    const las = await orginzation.find();
    res.json(las);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve notes" });
  }
});

module.exports = router;
