import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const UserProducts = ({ userEmail }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/user/${userEmail}`);
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchUserProducts();
    }
  }, [userEmail]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-4">No products found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default UserProducts;