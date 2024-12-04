import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css";

const PurchaseProduct = () => {
  const [formData, setFormData] = useState({
    long_name: "",
    ID: "",
    tag: "",
    barcode: "",
    quantity: "",
  });

  const [products, setProducts] = useState([]);
  const [vans, setVans] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsAndVansAndBusiness = async () => {
      try {
        const [productsResponse, vansResponse, businessesResponse] = await Promise.all([
          fetch("http://localhost:3030/get_products"),
          fetch("http://localhost:3030/get_vans"),
          fetch("http://localhost:3030/get_businesses"),
        ]);

        if (!productsResponse.ok || !vansResponse.ok || !businessesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [productsData, vansData, businessesData] = await Promise.all([
          productsResponse.json(),
          vansResponse.json(),
          businessesResponse.json(),
        ]);

        setProducts(productsData);
        setVans(vansData);
        setBusinesses(businessesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchProductsAndVansAndBusiness();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3030/purchase_product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_long_name: formData.long_name,
          ip_id: formData.ID,
          ip_tag: formData.tag,
          ip_barcode: formData.barcode,
          ip_quantity: formData.quantity,
        }),
      });

      if (response.ok) {
        alert("Product purchased successfully!");
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
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>Purchase Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>
            Business Name
            <select
              name="long_name"
              value={formData.long_name}
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
            Van ID
            <select
              name="ID"
              value={formData.ID}
              onChange={handleChange}
            >
              <option value="">Select Van</option>
              {vans.map((van, index) => (
                <option key={index} value={van}>
                  {van}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tag
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
            />
          </label>
          <label>
            Product Barcode
            <select
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
            >
              <option value="">Select Product Barcode</option>
              {products.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </label>
          <label>
            Quantity
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
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
            Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseProduct;
