import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', upload.single('profileImage'), registerUser);

export default router;