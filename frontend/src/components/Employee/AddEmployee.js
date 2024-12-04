import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    address: "",
    birthdate: "",
    taxID: "",
    salary: "",
    experience: "",
    hired_date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3030/add_employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_username: formData.username,
          ip_first_name: formData.first_name,
          ip_last_name: formData.last_name,
          ip_address: formData.address,
          ip_birthdate: formData.birthdate,
          ip_taxID: formData.taxID,
          ip_hired: formData.hired_date,
          ip_employee_experience: formData.experience,
          ip_salary: formData.salary,
        }),
      });

      if (response.ok) {
        alert("Employee added successfully!");
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
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Birthdate
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </label>
          <label>
            First Name
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Salary
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </label>
          
          <label>
            Experience
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </label>
          <label>
            Address
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Tax ID
            <input
              type="text"
              name="taxID"
              value={formData.taxID}
              onChange={handleChange}
            />
          </label>
          <label>
            Hired Date
            <input
              type="date"
              name="hired_date"
              value={formData.hired_date}
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
