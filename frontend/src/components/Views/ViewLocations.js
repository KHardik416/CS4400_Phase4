import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Views.css"; // Import the new CSS file

const LocationView = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:3030/location_view");
        setLocations(response.data); // Store the data in state
        setError(null); // Clear any errors
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError("Unable to load location data");
      }
    };

    fetchLocations();
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

      <h1>View: Locations</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Location Table */}
      {locations.length > 0 ? (
        <table className="view-table">
          <thead>
            <tr>
              <th>label</th>
              <th>long_name</th>
              <th>x_coord</th>
              <th>y_coord</th>
              <th>space</th>
              <th>num_vans</th>
              <th>van_ids</th>
              <th>remaining_capacity</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index}>
                <td>{location.label}</td>
                <td>{location.long_name}</td>
                <td>{location.x_coord}</td>
                <td>{location.y_coord}</td>
                <td>{location.space}</td>
                <td>{location.num_vans}</td>
                <td>{location.van_ids}</td>
                <td>{location.remaining_capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Loading location data...</p>
      )}
    </div>
  );
};

export default LocationView;
