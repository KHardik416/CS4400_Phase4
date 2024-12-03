import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const AddLocation = () => {
  const [formData, setFormData] = useState({
    label: "",
    x_coord: "",
    y_coord: "",
    space: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Location Data Submitted:", formData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Add Location</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            name
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
            />
          </label>
          <label>
            rating
            <input
              type="number" 
              name="x_coord"
              value={formData.x_coord}
              onChange={handleChange}
            />
          </label>
          <label>
            spent
            <input
              type="number"
              name="y_coord"
              value={formData.y_coord}
              onChange={handleChange}
            />
          </label>
          <label>
            location
            <input
              type="number"
              name="space"
              value={formData.space}
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

export default AddLocation;
