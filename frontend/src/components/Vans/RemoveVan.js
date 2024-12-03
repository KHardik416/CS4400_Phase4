import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const RemoveVan = () => {
  const [formData, setFormData] = useState({
    ID: "",
    tag: "",
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
      <h2>Remove Van</h2>
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
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemoveVan;
