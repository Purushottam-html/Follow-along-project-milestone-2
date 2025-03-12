import express from 'express';
import {
  createOrder,
  getUserOrders,
  cancelOrder
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/:email', getUserOrders);
router.put('/:id/cancel', cancelOrder);

export default router;