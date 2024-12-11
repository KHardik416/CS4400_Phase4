import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css";

const RemoveDriver = () => {
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await fetch("http://localhost:3030/add_worker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_username: formData.username,
        }),
      });

      if (response.ok) {
        alert("Worker added successfully!");
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
      <h2>Add Worker</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
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

export default RemoveDriver;
