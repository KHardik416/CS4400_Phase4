import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css";

const AddDriver = () => {
  const [formData, setFormData] = useState({
    username: "",
    licenseID: "",
    experience: "",
    license_type: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3030/add_driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_username: formData.username,
          ip_licenseID: formData.licenseID,
          ip_license_type: formData.license_type,
          ip_driver_experience: formData.experience,
        }),
      });

      if (response.ok) {
        alert("Driver added successfully!");
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
      <h2>Add Driver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            License ID
            <input
              type="number"
              name="licenseID"
              value={formData.licenseID}
              onChange={handleChange}
            />
          </label>
          <label>
            Experience
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </label>
          <label>
            License Type
            <input
              type="text"
              name="license_type"
              value={formData.license_type}
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

export default AddDriver;
