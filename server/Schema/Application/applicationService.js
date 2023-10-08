const JSONdb = require("../JSONdb");
const { v4: uuidv4 } = require("uuid"); // UUID , unique ids for each application
const jsonDB = new JSONdb("./Application/application.json");

// New application for writting file
async function newApplication(loanApplication) {
  loanApplication.Id = uuidv4();
  const applications = await jsonDB.loadData().applications;
  const updatedApplications = [...applications, loanApplication];
  await JSONdb.saveData(updatedApplications);
  return {
    ApplicationId: loanApplication.Id,
  };
}

//
async function getApplication(loanApplicationId) {
  const applications = await jsonDB.loadData().applications;
  const application = applications.find((app) => app.Id == loanApplicationId);
  if (application) {
    return {
      application,
    };
  }
  return {
    message: " application not found",
  };
}

module.exports = {
  newApplication,
  getApplication,
};
