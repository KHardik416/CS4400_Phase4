import React, { useEffect, useState } from "react";
import axios from "axios";

const DriverView = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>View: Drivers</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Driver Table */}
      {drivers.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
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
