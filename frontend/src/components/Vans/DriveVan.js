import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const DriveVan = () => {
  const [formData, setFormData] = useState({
    ID: "",
    tag: "",
    destination: "",   
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
      const response = await fetch("http://localhost:3030/drive_van", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_id: formData.ID,
          ip_tag: formData.tag,
          ip_destination: formData.destination,
        }),
      });

      if (response.ok) {
        alert("Van driven successfully!");
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
      <h2>Drive Van</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
        {/* Change to drop down based on database service ID*/}
            Delivery Service ID
            <input
              type="text"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
            />
          </label>
          <label>
            Van Tag
            <input
              type="number" 
              name="tag"
              value={formData.tag}
              onChange={handleChange}
            />
          </label>
          <label>
            Destination
            <input
              type="text"
              name="destination"
              value={formData.destination}
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
            Drive
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriveVan;
