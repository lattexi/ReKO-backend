import promisePool from '../config/db.js';

export const selectAllItems = async () => {
    const sql = 'SELECT * FROM Items';
    const [rows] = await promisePool.query(sql);
    return rows;
};

export const selectItemById = async (id) => {
    const sql = 'SELECT * FROM Items WHERE id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    return rows[0];
};

export const insertItem = async (item) => {
    const sql = 'INSERT INTO Items (name, description, price, category_id, image_path) VALUES (?, ?, ?, ?, ?)';
    const params = [
        item.name,
        item.description,
        item.price,
        item.category_id,
        item.image_path,
    ];
    const [result] = await promisePool.query(sql, params);
    return result;
};

export const updateItem = async (id, item) => {
    const sql = 'UPDATE Items SET name = ?, description = ?, price = ?, category_id = ?, image_path = ? WHERE id = ?';
    const params = [
        item.name,
        item.description,
        item.price,
        item.category_id,
        item.image_path,
        id,
    ];
    const [result] = await promisePool.query(sql, params);
    return result;
};

export const deleteItem = async (id) => {
    const sql = 'DELETE FROM Items WHERE id = ?';
    const [result] = await promisePool.query(sql, [id]);
    return result;
};

// featured items
export const insertFeaturedItem = async (item_id, start_date, end_date) => {
    const sql = 'INSERT INTO FeaturedItems (item_id, start_date, end_date) VALUES (?, ?, ?)';
    const [result] = await promisePool.query(sql, [item_id, start_date, end_date]);
    return result;
};

export const selectFeaturedItems = async () => {
    const today = new Date().toISOString().split('T')[0];
    const sql = `SELECT * FROM Items INNER JOIN FeaturedItems ON Items.id = FeaturedItems.item_id WHERE '${today}' BETWEEN start_date AND end_date`;
    const [rows] = await promisePool.query(sql);
    return rows;
};

export const deleteFeaturedItem = async (id) => {
    const sql = 'DELETE FROM FeaturedItems WHERE id = ?';
    const [result] = await promisePool.query(sql, [id]);
    return result;
};

// item search
export const selectItemBySearch = async (searchTerm) => {
    const sql = 'SELECT * FROM Items WHERE name LIKE ? OR description LIKE ?';
    const searchPattern = `%${searchTerm}%`;
    const [rows] = await promisePool.query(sql, [searchPattern, searchPattern]);
    return rows;
};

export const selectItemsByCategory = async (categoryId) => {
    const sql = 'SELECT * FROM Items WHERE category_id = ?';
    const [rows] = await promisePool.query(sql, [categoryId]);
    return rows;
};