const mongoose = require("mongoose");

const loanApp = new mongoose.Schema({
  title: String,
  content: String,
});

const loanApplication = mongoose.model("loanApp", loanApp);

module.exports = loanApplication;
