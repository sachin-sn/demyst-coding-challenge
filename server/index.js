const express = require("express");
const mongoose = require("mongoose");
const loanAppRoutes = require("./Schema/Application/applicationRoutes");

// init express
const app = express();
const port = 3030;

// Mango DB

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/loanapp", loanAppRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
