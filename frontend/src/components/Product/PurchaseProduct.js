import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const PurchaseProduct = () => {
  const [formData, setFormData] = useState({
    long_name: "",
    ID: "",
    tag: "",
    name: "",
    barcode: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data Submitted:", formData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Purchase Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            long name
            {/*Get from database dropdown, product name I think */}
            <input
              type="text"
              name="long_name"
              value={formData.long_name}
              onChange={handleChange}
            />
          </label>
          <label>
            service ID
            {/*Get from database dropdown, ID of service van belongs to I think */}
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
            barcode
            {/*Get from database dropdown, product barcode */}
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
            />
          </label>
          <label>
            quantity
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
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
            Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseProduct;
