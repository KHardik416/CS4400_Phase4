import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const ManageService = () => {
  const [formData, setFormData] = useState({
    username: "",
    ID: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service Data Submitted:", formData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Manage Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
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
            ID
            <input
              type="text" 
              name="ID"
              value={formData.ID}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="actions">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </button>
          <button type="submit" className="add-button">
            Begin
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageService;
