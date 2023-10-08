// Module created for logging user data on console
// This module can be extended to log details in to third party apps
module.exports = {
  log: (source, message) => {
    console.log("______________________________________________________");
    console.log("source:", source);
    console.log("message:", message);
    console.log("______________________________________________________");
  },
};
