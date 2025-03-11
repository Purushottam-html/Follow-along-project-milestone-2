import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const UserProducts = ({ userEmail }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserProducts = async () => {
        try {
            console.log('Fetching products for user:', userEmail);
            const response = await fetch(`http://localhost:5001/api/products/user/${userEmail}`);
            const data = await response.json();

            if (response.ok && data.success) {
                console.log('Products fetched successfully:', data.data.length);
                // Filter out duplicates by _id
                const uniqueProducts = Array.from(
                    new Map(data.data.map(item => [item._id, item])).values()
                );
                setProducts(uniqueProducts);
            } else {
                throw new Error(data.error || 'Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching user products:', error);
            setError('Failed to load your products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userEmail) {
            fetchUserProducts();
        }
    }, [userEmail]);

    const handleDeleteProduct = (deletedProductId) => {
        setProducts(prevProducts => 
            prevProducts.filter(product => product._id !== deletedProductId)
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading your products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Your Products</h2>
                    <Link
                        to="/add-product"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                        Add New Product
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <h3 className="text-xl text-gray-600 mb-4">You haven't added any products yet.</h3>
                        <Link
                            to="/add-product"
                            className="text-purple-600 hover:text-purple-800 font-medium"
                        >
                            Click here to add your first product →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard 
                                key={product._id} 
                                product={product}
                                isUserProduct={true}
                                onDelete={handleDeleteProduct}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProducts;