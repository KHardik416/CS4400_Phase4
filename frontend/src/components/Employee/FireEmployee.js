import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css";

const FireEmployee = () => {
  const [formData, setFormData] = useState({
    username: "",
    businessID: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3030/fire_employee", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_username: formData.username,
          ip_id: formData.businessID,
        }),
      });

      if (response.ok) {
        alert("Successfully fired employee!");
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
      <h2>Fire Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            businessID
            <input
              type="text"
              name="businessID"
              value={formData.businessID}
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

export default FireEmployee;
