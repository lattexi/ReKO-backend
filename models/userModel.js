import promisePool from '../config/db.js';
import bcrypt from 'bcrypt';

export const insertUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const sql = 'INSERT INTO Users (username, password, email, is_admin) VALUES (?, ?, ?, ?)';
    const params = [user.username, hashedPassword, user.email, user.is_admin];
    const [result] = await promisePool.query(sql, params);
    return result;
};

export const selectUserByUsername = async (username) => {
    const sql = 'SELECT * FROM Users WHERE username = ?';
    const [rows] = await promisePool.query(sql, [username]);
    return rows[0];
};

export const selectUsers = async () => {
    const sql = 'SELECT * FROM Users';
    const [rows] = await promisePool.query(sql);
    return rows;
};

export const deleteUser = async (id) => {
    const sql = 'DELETE FROM Users WHERE id = ?';
    const [result] = await promisePool.query(sql, [id]);
    return result;
};