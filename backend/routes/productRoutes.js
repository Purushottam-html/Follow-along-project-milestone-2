import express from 'express';
import { createProduct, getAllProducts, getProductsByUserEmail } from '../controllers/productController.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Route for creating a new product with image upload
router.post('/', uploadMiddleware.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/user/:email', getProductsByUserEmail);

export default router;