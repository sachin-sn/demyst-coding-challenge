const express = require("express");
const cors = require("cors"); // Import the cors middleware
const orgRoutes = require("./Schema/Org/orgRoutes");
const applicationRoutes = require("./Schema/Application/applicationRoutes");

// init express
const app = express();
const port = 3030;

// Mango DB

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
