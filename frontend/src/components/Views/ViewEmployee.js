import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeView = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3030/employee_view");
        setEmployees(response.data); // Store the data in state
        setError(null); // Clear any errors
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Unable to load employee data");
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={handleCancel}
          className="cancel-button button-pos"
        >
          Back to Home
        </button>
      </div>

      <h1>View: Employee</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Employee Table */}
      {employees.length > 0 ? (
        <table
          border="1"
          style={{ width: "100%", textAlign: "left", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>username</th>
              <th>taxID</th>
              <th>salary</th>
              <th>hired</th>
              <th>experience</th>
              <th>licenseID</th>
              <th>driving_experience</th>
              <th>manager_status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.username}</td>
                <td>{employee.taxID}</td>
                <td>{employee.salary}</td>
                <td>{employee.hired}</td>
                <td>{employee.experience}</td>
                <td>{employee.licenseID || "N/A"}</td>
                <td>{employee.driving_experience || "0"}</td>
                <td>{employee.manager_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Loading employee data...</p>
      )}
    </div>
  );
};

export default EmployeeView;
