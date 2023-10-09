const express = require("express");
const cors = require("cors"); // Import the cors middleware
const orgRoutes = require("./Schema/Org/orgRoutes");
const applicationRoutes = require("./Schema/Application/applicationRoutes");
const accountingRoutes = require("./Schema/AccountingSoftware/accountingRoutes");

// init express
const app = express();
const port = 3030;

// Middleware
app.use(express.json());

//enable Cors
app.use(
  cors({
    origin: "*",
  })
);

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/api/loan", applicationRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/balancesheet", accountingRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
