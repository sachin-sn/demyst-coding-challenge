const JSONdb = require("../JSONdb");

const jsonDB = new JSONdb("./Org/orgs.json");

async function getUser(email) {
  const users = await jsonDB.loadData().orgs;
  if (users) {
    const user = users.find((usr) => usr.email === email);
    return user;
  }
  return null;
}

module.exports = {
  getUser,
};
