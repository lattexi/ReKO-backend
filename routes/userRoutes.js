// userRoutes.js
import express from 'express';
import { registerUser, loginUser, getUsers, removeUser } from '../controllers/userController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();

// Middleware to handle validation results
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Get all users (admin only)
router.get('/', authenticateToken, isAdmin, getUsers);

// Register user with input validation
router.post(
    '/register',
    [
        body('username').isAlphanumeric().withMessage('Invalid username'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    validateRequest,
    registerUser
);

// Login user with input validation
router.post(
    '/login',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    validateRequest,
    loginUser
);

// Delete user (admin only) with parameter validation
router.delete(
    '/:id',
    authenticateToken,
    isAdmin,
    [
        param('id').isInt().withMessage('Invalid user ID')
    ],
    validateRequest,
    removeUser
);

export default router;