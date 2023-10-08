const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { getOrg, getAllOrg } = require("./orgService"); // Import the org model
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
    const org = await getOrg(email);
    if (org) {
      const auth = comparePassword(password, org.password);
      delete org.password;
      res.send({
        org,
        ...auth,
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

const comparePassword = (plainPassword, dbPassword) => {
  let passwordIsValid = bcrypt.compareSync(plainPassword, dbPassword);
  if (passwordIsValid) {
    log("Compare password success", "user authorized");
    return { auth: true, token: token }; // in the future we can implement JWT token for token based auth
  }
  log("Compare password failed", "user password incorrect");
  return { auth: false };
};

module.exports = router;
