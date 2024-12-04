import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3030/product_view");
        setProducts(response.data); // Store the data in state
        setError(null); // Clear any errors
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load product data");
      }
    };

    fetchProducts();
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

      <h1>View: Products</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Product Table */}
      {products.length > 0 ? (
        <table
          border="1"
          style={{ width: "100%", textAlign: "left", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>product_name</th>
              <th>location</th>
              <th>amount_available</th>
              <th>low_price</th>
              <th>high_price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.product_name}</td>
                <td>{product.location}</td>
                <td>{product.amount_available}</td>
                <td>{product.low_price}</td>
                <td>{product.high_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Loading product data...</p>
      )}
    </div>
  );
};

export default ProductView;
