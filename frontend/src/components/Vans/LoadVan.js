import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const LoadVan = () => {
  const [formData, setFormData] = useState({
    ID: "",
    tag: "",
    barcode: "",
    num_packages: "",
    price: "", 
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
            {/* Change to drop down based on database product barcode*/}
            barcode
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
            />
          </label>
          <label>
            num. packages
            <input
              type="number"
              name="num_packages"
              value={formData.num_packages}
              onChange={handleChange}
            />
          </label>
          <label>
            price
            <input
              type="number"
              name="price"
              value={formData.price}
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
            Deliver
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoadVan;
