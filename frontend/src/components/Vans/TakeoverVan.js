import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css";

const TakeoverVan = () => {
  const [formData, setFormData] = useState({
    ID: "",
    tag: "",
    new_driver: "",
  });

  const [ids, setIds] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdsAndDrivers = async () => {
      try {
        const [vanIdResponse, vanDriverResponse] = await Promise.all([
          fetch("http://localhost:3030/get_van_ids"),
          fetch("http://localhost:3030/get_van_drivers"),
        ]);

        if (!vanIdResponse.ok || !vanDriverResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [vanId, vanDriver] = await Promise.all([
          vanIdResponse.json(),
          vanDriverResponse.json(),
        ]);

        console.log(vanId);

        setIds(vanId);
        setDrivers(vanDriver);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchIdsAndDrivers();
  }, []);

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
            Delivery Service ID
            <select name="ID" value={formData.ID} onChange={handleChange}>
              <option value="">Select Van ID</option>
              {ids.map((id, index) => (
                <option key={index} value={id}>
                  {id}
                </option>
              ))}
            </select>
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
            New Driver
            <select
              name="new_driver"
              value={formData.new_driver}
              onChange={handleChange}
            >
              <option value="">Select Driver</option>
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default TakeoverVan;
