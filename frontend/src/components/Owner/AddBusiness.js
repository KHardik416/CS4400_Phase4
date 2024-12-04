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

    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3030/add_business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_long_name: formData.name,
          ip_rating: formData.rating,
          ip_spent: formData.spent,
          ip_location: formData.location,
        }),
      });

      if (response.ok) {
        alert("Business added successfully!");
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
      <h2>Add Business</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            name
            <input
              type="text"
              name="name"
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
