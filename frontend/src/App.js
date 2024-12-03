import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard"; 
import AddEmployee from "./components/Employee/AddEmployee"; 
import HireEmployee from "./components/Employee/HireEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/hire-employee" element={<HireEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
