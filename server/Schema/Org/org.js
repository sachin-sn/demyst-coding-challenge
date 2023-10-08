const mongoose = require("mongoose");

const org = new mongoose.Schema({
  name: String,
  description: String,
});

const orginzation = mongoose.model("org", org);

module.exports = orginzation;
