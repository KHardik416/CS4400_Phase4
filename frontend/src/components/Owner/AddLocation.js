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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3030/add_location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_label: formData.label,
          ip_x_coord: formData.x_coord,
          ip_y_coord: formData.y_coord,
          ip_space: formData.space,
        }),
      });

      if (response.ok) {
        alert("Location added successfully!");
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
            x_coord
            <input
              type="number" 
              name="x_coord"
              value={formData.x_coord}
              onChange={handleChange}
            />
          </label>
          <label>
            y_coord
            <input
              type="number"
              name="y_coord"
              value={formData.y_coord}
              onChange={handleChange}
            />
          </label>
          <label>
            space
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
