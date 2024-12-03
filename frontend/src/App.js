import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard"; 
import AddEmployee from "./components/Employee/AddEmployee"; 
import HireEmployee from "./components/Employee/HireEmployee";
import FireEmployee from "./components/Employee/FireEmployee";
import AddOwner from "./components/Owner/AddOwner";
import AddBusiness from "./components/Owner/AddBusiness";
import AddLocation from "./components/Owner/AddLocation";
import StartFunding from "./components/Owner/StartFunding";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/hire-employee" element={<HireEmployee />} />
        <Route path="/fire-employee" element={<FireEmployee />} />
        <Route path="/add-owner" element={<AddOwner />} />
        <Route path="/add-business" element={<AddBusiness />} />
        <Route path="/add-location" element={<AddLocation />} />
        <Route path="/start-funding" element={<StartFunding />} />
      </Routes>
    </Router>
  );
}

export default App;
