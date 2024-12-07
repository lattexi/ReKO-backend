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
import { validateRequest } from '../middleware/validationMiddleware.js';
import { body, param } from 'express-validator';

const router = express.Router();


// Search items
router.get(
    '/search/:query',
    [param('query').notEmpty().trim().escape().withMessage('Search query is required')],
    validateRequest,
    searchItem
);

router.get(
    '/category/:categoryId',
    [param('categoryId').isInt({ gt: 0 }).withMessage('Invalid category ID')],
    validateRequest,
    getItemsByCategory
);

// Featured items
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

router.get('/featured', getFeaturedItemsList);

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


// Items
router.get('/', getAllItems);

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

router.get(
    '/:id',
    [
        param('id').isInt({ gt: 0 }).withMessage('Invalid item ID')
    ],
    validateRequest,
    getItemById
);

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

export default router;