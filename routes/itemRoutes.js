import express from 'express';
import {
    listItem, getAllItems, getItemById, changeItem, removeItem,
    setFeaturedItem, getFeaturedItemsList, removeFeaturedItem,
    searchItem, getItemsByCategory
} from '../controllers/itemController.js';
import { upload } from '../config/multerConfig.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// searh items
router.get('/search/:query', searchItem);

router.get('/category/:categoryId', getItemsByCategory);

// items
router.get('/', getAllItems);

router.post('/', upload.single('image'), listItem);

router.get('/:id', getItemById);

router.put('/:id', authenticateToken, isAdmin, upload.single('image'), changeItem);

router.delete('/:id', removeItem);


// featured items
router.post('/featured', authenticateToken, isAdmin, setFeaturedItem);

router.get('/featured', getFeaturedItemsList);

router.delete('/featured/:id', authenticateToken, isAdmin, removeFeaturedItem);


export default router; 