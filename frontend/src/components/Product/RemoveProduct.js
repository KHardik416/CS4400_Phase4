import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const RemoveProduct = () => {
  const [formData, setFormData] = useState({
    barcode: "",
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
      <h2>Remove Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
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

export default RemoveProduct;
