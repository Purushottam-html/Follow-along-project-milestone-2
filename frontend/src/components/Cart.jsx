import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        setError('Please login to view cart');
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:5001/api/users/cart/${userEmail}`);
      const data = await response.json();

      if (data.success) {
        setCartItems(data.data);
      } else {
        setError(data.message || 'Failed to fetch cart items');
      }
    } catch (err) {
      console.error('Fetch cart error:', err);
      setError('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      setUpdating(true);
      const userEmail = localStorage.getItem('userEmail');

      const response = await fetch('http://localhost:5001/api/users/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          productId,
          quantity: newQuantity,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCartItems(data.data);
        toast.success('Cart updated');
      } else {
        toast.error(data.message || 'Failed to update cart');
      }
    } catch (err) {
      console.error('Update quantity error:', err);
      toast.error('Failed to update quantity');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading cart...</div>
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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Your cart is empty</div>
      </div>
    );
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="border-b last:border-b-0 p-6"
            >
              <div key={`content-${item.product._id}`} className="flex items-center">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="h-24 w-24 object-cover rounded"
                />
                
                <div className="ml-6 flex-1">
                  <h2 className="text-lg font-medium text-gray-900">
                    {item.product.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center ml-6">
                  <button 
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    disabled={updating || item.quantity <= 1}
                    className={`px-3 py-1 rounded-l border ${
                      updating || item.quantity <= 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    disabled={updating}
                    className={`px-3 py-1 rounded-r border ${
                      updating
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    +
                  </button>
                </div>

                <div className="ml-6 text-right">
                  <p className="text-lg font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Total</h2>
            <p className="text-2xl font-bold text-purple-600">
              ${calculateTotal().toFixed(2)}
            </p>
          </div>
          <button className="mt-4 w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;