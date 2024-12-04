import React, { useEffect, useState } from "react";
import axios from "axios";

const OwnerView = () => {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get("http://localhost:3030/owner_view");
        setOwners(response.data); // Store the data in state
        setError(null); // Clear any errors
      } catch (err) {
        console.error("Error fetching owners:", err);
        setError("Unable to load owner data");
      }
    };

    fetchOwners();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>View: Owners</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Owner Table */}
      {owners.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>username</th>
              <th>first_name</th>
              <th>last_name</th>
              <th>address</th>
              <th>num_businesses</th>
              <th>num_places</th>
              <th>highs</th>
              <th>lows</th>
              <th>debt</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, index) => (
              <tr key={index}>
                <td>{owner.username}</td>
                <td>{owner.first_name}</td>
                <td>{owner.last_name}</td>
                <td>{owner.address}</td>
                <td>{owner.num_buisnesses}</td>
                <td>{owner.num_places}</td>
                <td>{owner.highs}</td>
                <td>{owner.lows}</td>
                <td>{owner.debt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Loading owner data...</p>
      )}
    </div>
  );
};

export default OwnerView;
