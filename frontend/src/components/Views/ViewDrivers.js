import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Views.css"; // Import the new CSS file

const DriverView = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:3030/driver_view");
        setDrivers(response.data); // Store the data in state
        setError(null); // Clear any errors
      } catch (err) {
        console.error("Error fetching drivers:", err);
        setError("Unable to load driver data");
      }
    };

    fetchDrivers();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="view-container">
      <div>
        <button
          type="button"
          onClick={handleCancel}
          className="cancel-button button-pos"
        >
          Back to Home
        </button>
      </div>

      <h1>View: Drivers</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Driver Table */}
      {drivers.length > 0 ? (
        <table className="view-table">
          <thead>
            <tr>
              <th>username</th>
              <th>licenseID</th>
              <th>successful_trips</th>
              <th>num_vans</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index}>
                <td>{driver.username}</td>
                <td>{driver.licenseID}</td>
                <td>{driver.successful_trips}</td>
                <td>{driver.num_vans}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Loading driver data...</p>
      )}
    </div>
  );
};

export default DriverView;
