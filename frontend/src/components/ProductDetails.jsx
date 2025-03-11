import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// import { toast } from 'react-hot-toast';

const DEFAULT_IMAGE = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imgError, setImgError] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    // Function to correct port in URL if needed
    const getImageUrl = (url) => {
        if (!url || imgError) return DEFAULT_IMAGE;
        if (url.includes('localhost:5000')) {
            return url.replace('localhost:5000', 'localhost:5001');
        }
        return url;
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setImgError(false); // Reset image error state on new fetch
                const response = await fetch(`http://localhost:5001/api/products/${id}`);
                const data = await response.json();
                
                if (data.success) {
                    console.log('Product details:', data.data);
                    setProduct(data.data);
                } else {
                    setError(data.error || 'Failed to fetch product');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
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

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Product not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Product Image */}
                        <div className="md:flex-shrink-0 md:w-1/2">
                            <img
                                className="h-96 w-full object-cover md:h-full"
                                src={getImageUrl(product.imageUrl)}
                                alt={product.name}
                                onError={(e) => {
                                    console.log('Image failed to load:', product.imageUrl);
                                    setImgError(true);
                                    e.target.src = DEFAULT_IMAGE;
                                }}
                            />
                        </div>
                        
                        {/* Product Details */}
                        <div className="p-8 md:w-1/2">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>
                            
                            <div className="text-2xl font-bold text-purple-600 mb-4">
                                ${product.price.toFixed(2)}
                            </div>
                            
                            <div className="mb-6">
                                <h2 className="text-gray-500 text-sm uppercase tracking-wide mb-2">
                                    Description
                                </h2>
                                <p className="text-gray-600">{product.description}</p>
                            </div>
                            
                            <div className="mb-6">
                                <h2 className="text-gray-500 text-sm uppercase tracking-wide mb-2">
                                    Category
                                </h2>
                                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                    {product.category}
                                </span>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <h2 className="text-gray-500 text-sm uppercase tracking-wide mb-2">
                                    Quantity
                                </h2>
                                <div className="flex items-center border rounded-lg w-32">
                                    <button
                                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                        className="px-3 py-1 border-r hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(prev => prev + 1)}
                                        className="px-3 py-1 border-l hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                className={`w-full ${
                                    addingToCart
                                    ? 'bg-purple-400 cursor-not-allowed'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                } text-white py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center`}
                                onClick={async () => {
                                    try {
                                        setAddingToCart(true);
                                        const userEmail = localStorage.getItem('userEmail');
                                        if (!userEmail) {
                                            toast.error('Please login first');
                                            return;
                                        }

                                        const response = await fetch('http://localhost:5001/api/users/cart', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                email: userEmail,
                                                productId: product._id,
                                                quantity: quantity
                                            }),
                                        });

                                        const data = await response.json();
                                        if (data.success) {
                                            toast.success('Added to cart');
                                        } else {
                                            toast.error(data.message || 'Failed to add to cart');
                                        }
                                    } catch (err) {
                                        console.error('Add to cart error:', err);
                                        toast.error('Failed to add to cart');
                                    } finally {
                                        setAddingToCart(false);
                                    }
                                }}
                                disabled={addingToCart}
                            >
                                {addingToCart ? 'Adding...' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;