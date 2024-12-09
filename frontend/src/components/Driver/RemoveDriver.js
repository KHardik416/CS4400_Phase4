import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css";

const RemoveDriver = () => {
  const [formData, setFormData] = useState({
    username: "",
  });

  const [drivers, setDriver] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const vanDriverResponse = await fetch(
          "http://localhost:3030/get_van_drivers"
        );

        if (!vanDriverResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const vanDriver = await vanDriverResponse.json();

        setDriver(vanDriver);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
      }
    };

    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3030/remove_driver", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_username: formData.username,
        }),
      });

      if (response.ok) {
        alert("Driver added successfully!");
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
      <h2>Remove Driver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            Username
            {/*Get driver username from database dropdown USER USERNAME */}
            <select
              name="username"
              value={formData.username}
              onChange={handleChange}
            >
              <option value="">Select Van ID</option>
              {drivers.map((driver, index) => (
                <option key={index} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
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
