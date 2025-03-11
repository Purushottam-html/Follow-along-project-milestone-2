import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('User found, verifying password');
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('Login successful for user:', email);
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user with profile image if uploaded
    const user = await User.create({
      name,
      email,
      password,
      profileImage: req.body.imageUrl || null // Use imageUrl from request body
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user data'
      });
    }

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      },
      message: 'Registration successful'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

// @desc    Add product to cart
// @route   POST /api/users/cart
// @access  Public
const addToCart = async (req, res) => {
  try {
    const { email, productId, quantity } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if product already in cart
    const cartItemIndex = user.cart.findIndex(item =>
      item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      // Update existing item
      user.cart[cartItemIndex].quantity = quantity;
      user.cart[cartItemIndex].price = product.price;
    } else {
      // Add new item
      user.cart.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user.cart,
      message: 'Product added to cart'
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error adding product to cart'
    });
  }
};

// @desc    Get cart items
// @route   GET /api/users/cart/:email
// @access  Public
const getCart = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email }).populate('cart.product');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user.cart,
      message: 'Cart items retrieved successfully'
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving cart items'
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/users/cart
// @access  Public
const updateCartItemQuantity = async (req, res) => {
  try {
    const { email, productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const cartItemIndex = user.cart.findIndex(item =>
      item.product.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in cart'
      });
    }

    user.cart[cartItemIndex].quantity = quantity;
    await user.save();

    res.status(200).json({
      success: true,
      data: user.cart,
      message: 'Cart item quantity updated'
    });
  } catch (error) {
    console.error('Update cart quantity error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating cart item quantity'
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile/:email
// @access  Public
const getUserProfile = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        addresses: user.addresses
      },
      message: 'User profile retrieved successfully'
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving user profile'
    });
  }
};

// @desc    Add address to user profile
// @route   POST /api/users/address
// @access  Public
const addAddress = async (req, res) => {
  try {
    const { email, address } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.addresses.push(address);
    await user.save();

    res.status(200).json({
      success: true,
      data: user.addresses,
      message: 'Address added successfully'
    });
  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error adding address'
    });
  }
};

export { loginUser, registerUser, addToCart, getCart, updateCartItemQuantity, getUserProfile, addAddress };