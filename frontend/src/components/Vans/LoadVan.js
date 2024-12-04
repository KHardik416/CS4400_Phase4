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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3030/load_van", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_id: formData.ID,
          ip_tag: formData.tag,
          ip_barcode: formData.barcode,
          ip_num_packages: formData.num_packages,
          ip_price: formData.price,
        }),
      });

      if (response.ok) {
        alert("Van loaded successfully!");
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
      <h2>Load Van</h2>
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
