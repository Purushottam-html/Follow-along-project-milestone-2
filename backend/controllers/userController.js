import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt for email:', email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      res.status(401);
      throw new Error('Invalid email or password');
    }

    console.log('User found, verifying password');
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      console.log('Password mismatch for user:', email);
      res.status(401);
      throw new Error('Invalid email or password');
    }

    console.log('Login successful for user:', email);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error); // Pass error to error handling middleware
  }
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Create user with profile image if uploaded
    const user = await User.create({
      name,
      email,
      password,
      profileImage: req.file ? req.file.path : null
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        message: 'Registration successful'
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export { loginUser, registerUser };