import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

// @desc    Create new orders for cart items
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { email, address, items } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create an order for each cart item
    const orders = await Promise.all(items.map(async (item) => {
      const order = await Order.create({
        user: user._id,
        address,
        product: item.product._id,
        quantity: item.quantity,
        price: item.price
      });
      return order;
    }));

    // Clear user's cart after successful order creation
    user.cart = [];
    await user.save();

    res.status(201).json({
      success: true,
      data: orders,
      message: 'Orders created successfully'
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating orders'
    });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders/:email
// @access  Public
const getUserOrders = async (req, res) => {
  try {
    const { email } = req.params;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find all orders for the user
    const orders = await Order.find({ user: user._id })
      .populate('product')
      .sort({ createdAt: -1 }); // Most recent orders first

    res.status(200).json({
      success: true,
      data: orders,
      message: 'Orders retrieved successfully'
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving orders'
    });
  }
};

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Public
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending orders can be cancelled'
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      data: order,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error cancelling order'
    });
  }
};

export { createOrder, getUserOrders, cancelOrder };