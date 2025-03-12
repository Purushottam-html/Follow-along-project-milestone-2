import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    address1: {
      type: String,
      required: true
    },
    address2: String,
    zipCode: {
      type: String,
      required: true
    },
    addressType: {
      type: String,
      required: true,
      enum: ['home', 'work', 'other']
    }
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;