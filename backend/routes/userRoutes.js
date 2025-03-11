import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', uploadMiddleware('profileImage'), registerUser);

export default router;