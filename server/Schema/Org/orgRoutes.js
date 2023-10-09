const express = require("express");
const router = express.Router();
const { getOrg, getAllOrg, auth } = require("./orgService"); // Import the org model
const { log } = require("../../Log");

// Get matching org
router.get("/user", async (req, res) => {
  try {
    const email = req.query.email;
    const org = await getOrg(email);
    res.send({
      org: org,
    });
  } catch (error) {
    log("org fetch error:", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

// Get all orgs
router.get("/all", async (req, res) => {
  try {
    log("getAllOrgs requested");
    const orgs = await getAllOrg();
    log("get orgs requested from DB", orgs);
    res.send({ orgs: orgs });
  } catch (error) {
    log("org fetch all error:", error);
    res.status(500).json({ error: "Failed to retrieve all user" });
  }
});

//Auth for user org
// password: DemystTest@23
router.get("/auth", async (req, res) => {
  try {
    log("login requested");
    const email = req.query.email;
    const password = req.query.password;
    const org = await auth(email, password);
    if (org) {
      res.send({
        ...org,
      });
    }
    return {
      message: "user not found!",
    };
  } catch (error) {
    log("/auth fetch error:", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

module.exports = router;
