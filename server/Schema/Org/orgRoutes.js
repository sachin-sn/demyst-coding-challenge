const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { getUser } = require("./orgService"); // Import the org model
const { Log } = require("../../Log");

// Get matching org
router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    return await getUser(email);
  } catch (error) {
    Log("org fetch error:", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

//Auth for user org
// password: Password@123!#$%
router.get("/auth", async (req, res) => {
  try {
    const email = req.query.email;
    const password = req.query.password;
    const user = await getUser(email);
    if (user) {
      const auth = comparePassword(password, user.password);
      delete user.password;
      return {
        ...user,
        ...auth,
      };
    }
    return {
      message: "user not found!",
    };
  } catch (error) {
    Log("/auth fetch error:", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

const comparePassword = (plainPassword, dbPassword) => {
  let passwordIsValid = bcrypt.compareSync(plainPassword, dbPassword);
  if (passwordIsValid) {
    Log("Compare password success", "user authorized");
    return { auth: true, token: token }; // in the future we can implement JWT token for token based auth
  }
  Log("Compare password failed", "user password incorrect");
  return { auth: false };
};

module.exports = router;
