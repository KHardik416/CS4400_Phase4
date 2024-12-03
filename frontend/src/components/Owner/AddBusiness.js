import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const AddBusiness = () => {
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    spent: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Business Data Submitted:", formData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Add Business</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            name
            <input
              type="text"
              name="username"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            rating
            <input
              type="number" 
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </label>
          <label>
            spent
            <input
              type="number"
              name="spent"
              value={formData.spent}
              onChange={handleChange}
            />
          </label>
          <label>
            location
            <input
              type="text"
              name="location"
              value={formData.location}
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

export default AddBusiness;
