import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationView = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>View: Locations</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Location Table */}
      {locations.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
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
