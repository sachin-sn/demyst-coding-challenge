const JSONdb = require("../JSONdb");
const { v4: uuidv4 } = require("uuid"); // UUID , unique ids for each application
const jsonDB = new JSONdb("./Application/applications.json");

// New application for writting file
async function newApplication(loanApplication) {
  loanApplication.Id = uuidv4();
  const applications = await jsonDB.loadData().applications;
  const updatedApplications = [...applications, loanApplication];
  await jsonDB.saveData(updatedApplications);
  return loanApplication;
}

// Update application with updated details
async function updateApplication(loanApplicationId, loanApplication) {
  const applications = await jsonDB.loadData().applications;
  let application = applications.find((apl) => apl.Id === loanApplicationId);
  if (application) {
    application = { ...application, ...loanApplication }; // Updating the application with the latest changes
    const updatedApplications = applications.map((apl) => {
      if (apl.Id === loanApplicationId) return application;
      return apl;
    });
    await jsonDB.saveData(updatedApplications); // saving the data ti DB
  }
  return application;
}

// get application
async function getApplication(loanApplicationId) {
  const applications = await jsonDB.loadData();
  const application = applications.find((app) => app.Id == loanApplicationId);
  if (application) {
    return application;
  }
  return {
    message: " application not found",
  };
}

// get all applications based on org
async function getApplications(email) {
  const applications = await jsonDB.loadData();
  if (applications) {
    const matchingApplications = applications.filter((app) => {
      if (app.email === email) return app;
    });
    if (matchingApplications && matchingApplications.length > 0) {
      return matchingApplications;
    }
  }
  return [];
}

module.exports = {
  newApplication,
  updateApplication,
  getApplication,
  getApplications,
};
