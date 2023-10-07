const mongoose = require("mongoose");

const loanApp = new mongoose.Schema({
  title: String,
  content: String,
});

const LA = mongoose.model("Note", loanApp);

module.exports = LA;
