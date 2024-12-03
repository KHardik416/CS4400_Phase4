import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Dashboard.css";

const Dashboard = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleNavigation = (option) => {
    switch (option) {
      case "Add Employee":
        navigate("/add-employee");
        break;
      case "Hire Employee":
        navigate("/hire-employee");
        break;
      case "Fire Employee":
        navigate("/fire-employee");
        break;
      // Add similar cases for other menu options here
      default:
        console.log(`No route defined for: ${option}`);
    }
  };

  const menuItems = [
    { label: "Employees", options: ["Add Employee", "Hire Employee", "Fire Employee"] },
    { label: "Owners/Businesses", options: ["Add Owner", "Add Business", "Add Location", "Start Funding"] },
    { label: "Vans", options: ["Add Van", "Takeover Van", "Load Van", "Refuel Van", "Drive Van", "Remove Van"] },
    { label: "Drivers", options: ["Add Driver", "Remove Driver"] },
    { label: "Services", options: ["Add Service", "Manage Service"] },
    { label: "Products", options: ["Add Product", "Purchase Product", "Remove Product"] },
    { label: "Views", options: ["View Employees", "View Owners", "View Drivers", "View Locations", "View Products", "View Services"] },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">Dashboard</header>
      <div className="dashboard-content">
        {menuItems.map((menu, index) => (
          <div key={index} className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => toggleDropdown(index)}
            >
              {menu.label}
            </button>
            {activeDropdown === index && (
              <div className="dropdown-menu">
                {menu.options.map((option, i) => (
                  <div
                    key={i}
                    className="dropdown-item"
                    onClick={() => handleNavigation(option)} // Navigate on click
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
