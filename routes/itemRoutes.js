// itemRoutes.js
import express from 'express';
import {
    listItem,
    getAllItems,
    getItemById,
    changeItem,
    removeItem,
    setFeaturedItem,
    getFeaturedItemsList,
    removeFeaturedItem,
    searchItem,
    getItemsByCategory,
} from '../controllers/itemController.js';
import { upload } from '../config/multerConfig.js';
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

// Search items with parameter validation
router.get(
    '/search/:query',
    [param('query').notEmpty().trim().escape().withMessage('Search query is required')],
    validateRequest,
    searchItem
);

// Get items by category with parameter validation
router.get(
    '/category/:categoryId',
    [param('categoryId').isInt({ gt: 0 }).withMessage('Invalid category ID')],
    validateRequest,
    getItemsByCategory
);

// Get all items
router.get('/', getAllItems);

// Add new item with input validation
router.post(
    '/',
    authenticateToken,
    isAdmin,
    upload.single('image'),
    [
        body('name').notEmpty().withMessage('Name is required').isLength({ max: 100 }),
        body('description').optional().isLength({ max: 500 }),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
        body('category_id').isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),
    ],
    validateRequest,
    listItem
);

// Get item by ID with parameter validation
router.get(
    '/:id',
    [
        param('id').isInt({ gt: 0 }).withMessage('Invalid item ID')
    ],
    validateRequest,
    getItemById
);

// Update item with input and parameter validation
router.put(
    '/:id',
    authenticateToken,
    isAdmin,
    upload.single('image'),
    [
        param('id').isInt({ gt: 0 }).withMessage('Invalid item ID'),
        body('name').notEmpty().withMessage('Name is required').isLength({ max: 100 }),
        body('description').optional().isLength({ max: 500 }),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
        body('category_id').isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),
    ],
    validateRequest,
    changeItem
);

// Delete item with parameter validation
router.delete(
    '/:id',
    authenticateToken,
    isAdmin,
    [
        param('id').isInt({ gt: 0 }).withMessage('Invalid item ID')
    ],
    validateRequest,
    removeItem
);

// Set featured item with input validation
router.post(
    '/featured',
    authenticateToken,
    isAdmin,
    [
        body('item_id').isInt({ gt: 0 }).withMessage('Invalid item ID'),
        body('start_date').isISO8601().toDate().withMessage('Invalid start date'),
        body('end_date').isISO8601().toDate().withMessage('Invalid end date'),
    ],
    validateRequest,
    setFeaturedItem
);

// Get featured items
router.get('/featured', getFeaturedItemsList);

// Delete featured item with parameter validation
router.delete(
    '/featured/:id',
    authenticateToken,
    isAdmin,
    [
        param('id').isInt({ gt: 0 }).withMessage('Invalid featured item ID')
    ],
    validateRequest,
    removeFeaturedItem
);

export default router;