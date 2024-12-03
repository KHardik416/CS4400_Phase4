import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const AddVan = () => {
  const [formData, setFormData] = useState({
    ID: "",
    tag: "",
    fuel: "",
    capacity: "",
    sales: "",
    driver: "",   
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Van Data Submitted:", formData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Add Van</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
        {/* Change to drop down based on database service ID*/}
            ID
            <input
              type="text"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
            />
          </label>
          <label>
            tag
            <input
              type="number" 
              name="tag"
              value={formData.tag}
              onChange={handleChange}
            />
          </label>
          <label>
            fuel
            <input
              type="number"
              name="fuel"
              value={formData.fuel}
              onChange={handleChange}
            />
          </label>
          <label>
            capacity
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
            />
          </label>
          <label>
            sales
            <input
              type="number"
              name="sales"
              value={formData.sales}
              onChange={handleChange}
            />
          </label>
          <label>
            {/* Change to drop down based on database driver license ID*/}
            driver
            <input
              type="text"
              name="driver"
              value={formData.driver}
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

export default AddVan;
