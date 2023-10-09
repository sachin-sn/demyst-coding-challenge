const JSONdb = require("../JSONdb");
const bcrypt = require("bcryptjs");
const { log } = require("../../Log");

const jsonDB = new JSONdb("./Org/orgs.json");

async function getOrg(email) {
  const orgs = await jsonDB.loadData().orgs;
  if (orgs) {
    const org = orgs.find((usr) => usr.email === email);
    if (org) {
      delete org.password;
      return org;
    }
  }
  return null;
}

async function getAllOrg() {
  const orgs = await jsonDB.loadData().orgs;
  return orgs;
}

async function auth(email, password) {
  const orgs = await jsonDB.loadData().orgs;
  if (orgs) {
    const org = orgs.find((usr) => usr.email === email);
    if (org) {
      const auth = comparePassword(password, org.password);
      if (auth.auth) {
        delete org.password;
        return { org, auth };
      }
      return {
        auth,
      };
    }
  }
  return null;
}

const comparePassword = (plainPassword, dbPassword) => {
  try {
    let passwordIsValid = bcrypt.compareSync(plainPassword, dbPassword);
    if (passwordIsValid) {
      return { auth: true, token: "Session-Token" }; // in the future we can implement JWT token for token based auth
    }
    return { auth: false };
  } catch (error) {
    log("error in compare password", error);
  }
};

module.exports = {
  getOrg,
  getAllOrg,
  auth,
};
