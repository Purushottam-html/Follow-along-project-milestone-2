import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        setError('Please login to view orders');
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:5001/api/orders/${userEmail}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
      setLoading(false);
    } catch (err) {
      console.error('Fetch orders error:', err);
      setError('Failed to load orders');
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/orders/${orderId}/cancel`, {
        method: 'PUT',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Order cancelled successfully');
        // Update the order status in the local state
        setOrders(orders.map(order => 
          order._id === orderId 
            ? { ...order, status: 'cancelled' }
            : order
        ));
      } else {
        toast.error(data.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Cancel order error:', error);
      toast.error('Failed to cancel order');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">No orders found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID: {order._id}
                </p>
                <p className="text-sm text-gray-500">
                  Ordered on: {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <img
                src={order.product.imageUrl}
                alt={order.product.name}
                className="h-20 w-20 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium">{order.product.name}</h3>
                <p className="text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-purple-600 font-medium">
                  ${order.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Delivery Address</h4>
              <div className="text-sm text-gray-600">
                <p>{order.address.address1}</p>
                {order.address.address2 && <p>{order.address.address2}</p>}
                <p>{order.address.city}, {order.address.zipCode}</p>
                <p>{order.address.country}</p>
              </div>
            </div>

            {order.status === 'pending' && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;