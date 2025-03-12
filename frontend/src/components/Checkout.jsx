import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAddresses();
    fetchCartItems();
  }, []);

  const fetchAddresses = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5001/api/users/profile/${userEmail}`);
      const data = await response.json();

      if (data.success && data.data.addresses) {
        setAddresses(data.data.addresses);
      }
    } catch (err) {
      setError('Failed to fetch addresses');
      console.error('Fetch addresses error:', err);
    }
  };

  const fetchCartItems = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5001/api/users/cart/${userEmail}`);
      const data = await response.json();

      if (data.success) {
        setCartItems(data.data);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cart items');
      setLoading(false);
      console.error('Fetch cart error:', err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          address: selectedAddress,
          items: cartItems
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Order placed successfully');
        navigate('/orders');
      } else {
        toast.error(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Place order error:', error);
      toast.error('Failed to place order');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Address Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>
        {addresses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address, index) => (
              <div 
                key={index}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedAddress === address ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedAddress(address)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                      {address.addressType}
                    </span>
                    <p className="mt-2">{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>{address.city}</p>
                    <p>{address.zipCode}</p>
                    <p>{address.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 border rounded-lg">
            <p className="text-gray-500">No addresses found</p>
            <button
              onClick={() => navigate('/add-address')}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Add New Address
            </button>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {cartItems.map((item) => (
            <div key={item.product._id} className="border-b last:border-b-0 p-4">
              <div className="flex items-center">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="h-20 w-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium">{item.product.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-purple-600 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total and Place Order */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Total</h2>
          <p className="text-2xl font-bold text-purple-600">
            ${calculateTotal().toFixed(2)}
          </p>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={!selectedAddress}
          className={`w-full py-3 px-6 rounded-lg text-white text-lg font-semibold
            ${
              selectedAddress
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gray-400 cursor-not-allowed'
            }
          `}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;