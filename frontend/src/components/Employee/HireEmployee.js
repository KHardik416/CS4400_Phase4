import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./HireEmployee.css"; 

const HireEmployee = () => {
  const [formData, setFormData] = useState({
    username: "",
    businessID: ""
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Hired:", formData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="hire-employee-container">
      <h2>Hire Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="hire-employee-form">
          <label>
            username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            businessID
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="hire-employee-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </button>
          <button type="submit" className="hire-button">
            Hire
          </button>
        </div>
      </form>
    </div>
  );
};

export default HireEmployee;
