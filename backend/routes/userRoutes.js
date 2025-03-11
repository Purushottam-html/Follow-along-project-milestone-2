import express from 'express';
import {
  loginUser,
  registerUser,
  addToCart,
  getCart,
  updateCartItemQuantity,
  getUserProfile,
  addAddress
} from '../controllers/userController.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', uploadMiddleware('profileImage'), registerUser);

// Cart routes
router.post('/cart', addToCart);
router.get('/cart/:email', getCart);
router.put('/cart', updateCartItemQuantity);

// Profile route
router.get('/profile/:email', getUserProfile);

// Address route
router.post('/address', addAddress);

export default router;