import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import { Container, Box } from "@mui/material";
import Home from "./Home";
import Loan from "./Loan";
import Application from "./Application";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Container maxWidth="xlg" sx={{ marginTop: "100px" }}>
          <Box sx={{ bgcolor: "#eee", minHeight: "100vh", width: "100%" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Loan/:id?" element={<Loan />} />
              <Route path="/Application" element={<Application />} />
            </Routes>
          </Box>
        </Container>
      </div>
    </Router>
  );
}

export default App;
