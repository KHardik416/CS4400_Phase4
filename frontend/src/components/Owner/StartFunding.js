import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css";

const StartFunding = () => {
  const [formData, setFormData] = useState({
    owner: "",
    amount: "",
    business_name: "",
    fund_date: "",
  });

  const [owners, setOwners] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch owners and businesses from the database
  useEffect(() => {
    const fetchOwnersAndBusinesses = async () => {
      try {
        const [ownersResponse, businessesResponse] = await Promise.all([
          fetch("http://localhost:3030/get_owners"),
          fetch("http://localhost:3030/get_businesses"),
        ]);

        if (!ownersResponse.ok || !businessesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [ownersData, businessesData] = await Promise.all([
          ownersResponse.json(),
          businessesResponse.json(),
        ]);

        setOwners(ownersData);
        setBusinesses(businessesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchOwnersAndBusinesses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.owner || !formData.business_name || !formData.fund_date) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3030/start_funding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_owner: formData.owner,
          ip_amount: formData.amount || null, // Send null if amount is empty
          ip_long_name: formData.business_name,
          ip_fund_date: formData.fund_date,
        }),
      });

      if (response.ok) {
        alert("Funded successfully!");
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

  if (isLoading) {
    return <p>Loading...</p>; // Loading spinner or message
  }

  return (
    <div className="container">
      <h2>Fund a Business</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            Owner Name
            <select
              name="owner"
              value={formData.owner}
              onChange={handleChange}
            >
              <option value="">Select Owner</option>
              {owners.map((owner, index) => (
                <option key={index} value={owner}>
                  {owner}
                </option>
              ))}
            </select>
          </label>
          <label>
            Amount
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label>
            Business Name
            <select
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
            >
              <option value="">Select Business</option>
              {businesses.map((business, index) => (
                <option key={index} value={business}>
                  {business}
                </option>
              ))}
            </select>
          </label>
          <label>
            Fund Date
            <input
              type="date"
              name="fund_date"
              value={formData.fund_date}
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
            Fund
          </button>
        </div>
      </form>
    </div>
  );
};

export default StartFunding;
