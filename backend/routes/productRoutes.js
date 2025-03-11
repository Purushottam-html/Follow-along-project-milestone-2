import express from 'express';
import { 
    createProduct, 
    getAllProducts, 
    getProductsByUserEmail,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Create product
router.post('/', uploadMiddleware('image'), createProduct);

// Update product
router.put('/:id', uploadMiddleware('image'), updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

// Get all products
router.get('/', getAllProducts);

// Get user's products
router.get('/user/:email', getProductsByUserEmail);

// Get single product (keep this last to avoid route conflicts)
router.get('/:id', getProductById);

export default router;