import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // For now, just return success (we'll implement actual authentication later)
    res.json({
      message: 'Login successful',
      user: {
        email,
      },
    });
  } catch (error) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

export { loginUser };