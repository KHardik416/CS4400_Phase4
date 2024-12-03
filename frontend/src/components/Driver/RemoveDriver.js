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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver Data Submitted:", formData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Remove Driver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            username
            {/*Get driver username from database dropdown USER USERNAME */}
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
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemoveDriver;
