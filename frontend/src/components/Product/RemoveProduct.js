import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css"; 

const RemoveProduct = () => {
  const [formData, setFormData] = useState({
    barcode: "",
  });

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse] = await Promise.all([
          fetch("http://localhost:3030/get_products"),
        ]);

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [productsData] = await Promise.all([
          productsResponse.json()
        ]);

        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3030/remove_product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip_barcode: formData.barcode,
        }),
      });

      if (response.ok) {
        alert("Product removed successfully!");
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
      <h2>Remove Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
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
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemoveProduct;
