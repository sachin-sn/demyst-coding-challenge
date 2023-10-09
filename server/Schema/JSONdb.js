const fs = require("fs");
const path = require("path");
const { log } = require("../Log");

class JSONdb {
  constructor(fileName) {
    this.dataFilePath = path.join(__dirname, fileName);
  }
  // Load data from the JSON file
  loadData() {
    try {
      const data = fs.readFileSync(this.dataFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      log("error", error);
      // If the file doesn't exist or there's an error parsing it, return an empty object
      return null;
    }
  }

  // Save data to the JSON file
  saveData(data) {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2));
  }
}

module.exports = JSONdb;
