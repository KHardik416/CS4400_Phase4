import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const TakeoverVan = () => {
  const [formData, setFormData] = useState({
    ID: "",
    tag: "",
    new_driver: "",   
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
      const response = await fetch("http://localhost:3030/takeover_van", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_username: formData.new_driver,
          ip_id: formData.ID,
          ip_tag: formData.tag,
        }),
      });

      if (response.ok) {
        alert("Van taken over successfully!");
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
      <h2>Takeover Van</h2>
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
            {/* Change to drop down based on database driver license ID*/}
            New driver
            <input
              type="text"
              name="new_driver"
              value={formData.new_driver}
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

export default TakeoverVan;
