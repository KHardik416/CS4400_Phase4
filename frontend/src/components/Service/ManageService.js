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

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3030/manage_service", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_username: formData.username,
          ip_id: formData.ID,
        }),
      });

      if (response.ok) {
        alert("Service managed successfully!");
        navigate("/");
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageService;
