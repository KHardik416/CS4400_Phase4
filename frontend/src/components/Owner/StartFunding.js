import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const StartFunding = () => {
  const [formData, setFormData] = useState({
    owner: "",
    amount: "",
    business_name: "",
    fund_date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fund Data Submitted:", formData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Fund a Business</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            owner name
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
            />
          </label>
          <label>
            amount
            <input
              type="number" 
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label>
            business_name
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
            />
          </label>
          <label>
            fund_date
            <input
              type="date"
              name="fund_date"
              value={formData.fund_date}
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
            Fund
          </button>
        </div>
      </form>
    </div>
  );
};

export default StartFunding;
