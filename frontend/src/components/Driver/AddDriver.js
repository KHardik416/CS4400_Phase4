import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const AddDriver = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    licenseID: "",
    experience: "",
    license_type: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver Data Submitted:", formData);
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
            username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            licenseID
            <input
              type="number" 
              name="licenseID"
              value={formData.licenseID}
              onChange={handleChange}
            />
          </label>
          <label>
            experience
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </label>
          <label>
            license_type
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
