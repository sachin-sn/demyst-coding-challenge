import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import { Container, Box } from "@mui/material";
import Home from "./Home";
import New from "./New";
import History from "./History";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Container maxWidth="xlg" sx={{ marginTop: "100px" }}>
          <Box sx={{ bgcolor: "#eee", height: "100vh", width: "100%" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/New" element={<New />} />
              <Route path="/History" element={<History />} />
            </Routes>
          </Box>
        </Container>
      </div>
    </Router>
  );
}

export default App;
