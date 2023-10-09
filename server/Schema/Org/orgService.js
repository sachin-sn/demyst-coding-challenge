const JSONdb = require("../JSONdb");
const { log } = require("../../Log");

const jsonDB = new JSONdb("./Org/orgs.json");

async function getOrg(email) {
  const orgs = await jsonDB.loadData().orgs;
  if (orgs) {
    const org = orgs.find((usr) => usr.email === email);
    return org;
  }
  return null;
}

async function getAllOrg() {
  const orgs = await jsonDB.loadData().orgs;
  return orgs;
}

module.exports = {
  getOrg,
  getAllOrg,
};
