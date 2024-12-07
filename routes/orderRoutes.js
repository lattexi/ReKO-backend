import express from 'express';
import {
    placeOrder,
    getAllOrders,
    getOrderById,
    removeOrder,
} from '../controllers/orderController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { body, param } from 'express-validator';

const router = express.Router();

router.post(
    '/',
    [
        body('customer_name').notEmpty().withMessage('Customer name is required').isLength({ max: 100 }).withMessage('Customer name is too long'),
        body('customer_email').isEmail().withMessage('Invalid email address'),
        body('customer_address').notEmpty().withMessage('Customer address is required'),
        body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
        body('items.*.item_id').isInt({ gt: 0 }).withMessage('Item ID must be a positive integer'),
        body('items.*.quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
        body('items.*.price_at_purchase').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    ],
    validateRequest,
    placeOrder
);

router.get('/', authenticateToken, isAdmin, getAllOrders);

router.get(
    '/:id',
    authenticateToken,
    [
        param('id').isInt().withMessage('Invalid order ID')
    ],
    validateRequest,
    getOrderById
);

router.delete(
    '/:id',
    authenticateToken,
    isAdmin,
    [
        param('id').isInt().withMessage('Invalid order ID')
    ],
    validateRequest,
    removeOrder
);

export default router;