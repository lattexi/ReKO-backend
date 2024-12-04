import { insertUser, selectUserByUsername, selectUsers, deleteUser } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = {
            username,
            password,
            email,
            is_admin: false,
        };
        const existingUser = await selectUserByUsername(user.username);
        if (existingUser) {
            return res.status(400).json({ message: 'Käyttäjänimi on jo käytössä' });
        }
        await insertUser(user);
        res.status(201).json({ message: 'Käyttäjä rekisteröity onnistuneesti' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await selectUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'Virheellinen käyttäjänimi' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Virheellinen käyttäjänimi tai salasana' });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, is_admin: user.is_admin },
            process.env.JWT_SECRET,
            { expiresIn: JWT_TOKEN_EXPIRES_IN }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await selectUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeUser = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.json({ message: 'Käyttäjä poistettu onnistuneesti' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};