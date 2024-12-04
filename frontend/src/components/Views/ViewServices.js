import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceView = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3030/service_view");
        setServices(response.data); // Store the data in state
        setError(null); // Clear any errors
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Unable to load service data");
      }
    };

    fetchServices();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <h1>View: Services</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Service Table */}
      {services.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>id</th>
              <th>long_name</th>
              <th>home_base</th>
              <th>manager</th>
              <th>revenue</th>
              <th>products_carried</th>
              <th>cost_carried</th>
              <th>weight_carried</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td>{service.id}</td>
                <td>{service.long_name}</td>
                <td>{service.home_base}</td>
                <td>{service.manager}</td>
                <td>{service.revenue}</td>
                <td>{service.products_carried}</td>
                <td>{service.cost_carried}</td>
                <td>{service.weight_carried}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Loading service data...</p>
      )}
    </div>
  );
};

export default ServiceView;
