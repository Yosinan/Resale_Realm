import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

export const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API or database
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Product Dashboard</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-stock">Stock: {product.stock}</p>
              <p className="product-description">{product.description}</p>
              <p className="product-user">Added by: {product.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

