import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const AddService = () => {
  const [formData, setFormData] = useState({
    ID: "",
    name: "",
    home_base: "",
    manager: "",
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
      const response = await fetch("http://localhost:3030/add_service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_id: formData.ID,
          ip_long_name: formData.name,
          ip_home_base: formData.home_base,
          ip_manager: formData.manager
        }),
      });

      if (response.ok) {
        alert("Service added successfully!");
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
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            ID
            <input
              type="text"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
            />
          </label>
          <label>
            name
            <input
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            home base
            <input
              type="text"
              name="home_base"
              value={formData.home_base}
              onChange={handleChange}
            />
          </label>
          <label>
            manager
            <input
              type="text"
              name="manager"
              value={formData.manager}
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
