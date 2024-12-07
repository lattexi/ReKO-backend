import express from 'express';
import { registerUser, loginUser, getUsers, removeUser, getUserByUsername } from '../controllers/userController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { body, param } from 'express-validator';

const router = express.Router();


router.get('/', authenticateToken, isAdmin, getUsers);

router.get('/me', authenticateToken, getUserByUsername);

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

router.post(
    '/login',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    validateRequest,
    loginUser
);

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