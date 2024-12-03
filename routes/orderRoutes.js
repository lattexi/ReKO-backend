import express from 'express';
import { placeOrder, getAllOrders, getOrderById, removeOrder, } from '../controllers/orderController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', placeOrder);

router.get('/', authenticateToken, isAdmin, getAllOrders);

router.get('/:id', authenticateToken, getOrderById);

router.delete('/:id', authenticateToken, isAdmin, removeOrder);

export default router;