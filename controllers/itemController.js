import {
    selectAllItems, selectItemById, insertItem, updateItem, deleteItem,
    insertFeaturedItem, selectFeaturedItems, deleteFeaturedItem,
    selectItemBySearch, selectItemsByCategory
} from '../models/itemModel.js';

export const getAllItems = async (req, res) => {
    try {
        const items = await selectAllItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listItem = async (req, res) => {
    try {
        const { name, description, price, category_id } = req.body;
        const image_path = req.file ? req.file.filename : null;

        const item = {
            name,
            description,
            price,
            category_id,
            image_path,
        };

        const result = await insertItem(item);
        res.status(201).json({ message: 'Tuote lisätty onnistuneesti', itemId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await selectItemById(id);
        if (!item) {
            return res.status(404).json({ message: 'Tuotetta ei löydy' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const changeItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category_id } = req.body;
        const image_path = req.file ? req.file.filename : null;

        const item = {
            name,
            description,
            price,
            category_id,
            image_path,
        };

        await updateItem(id, item);
        res.json({ message: 'Tuote päivitetty onnistuneesti' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeItem = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteItem(id);
        res.json({ message: 'Tuote poistettu onnistuneesti' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// featured items
export const setFeaturedItem = async (req, res) => {
    try {
        const { item_id, start_date, end_date } = req.body;
        await insertFeaturedItem(item_id, start_date, end_date);
        res.json({ message: 'Tuote asetettu nostetuksi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFeaturedItemsList = async (req, res) => {
    try {
        const items = await selectFeaturedItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeFeaturedItem = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteFeaturedItem(id);
        res.json({ message: 'Nosto poistettu' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchItem = async (req, res) => {
    try {
        const search = req.params.query;
        console.log(search);
        const items = await selectItemBySearch(search);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const items = await selectItemsByCategory(categoryId);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
