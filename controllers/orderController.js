import { insertOrder, selectAllOrders, selectOrderById, deleteOrder } from '../models/orderModel.js';

export const placeOrder = async (req, res) => {
    try {
        const user_id = req.user ? req.user.id : null;
        const { customer_name, customer_email, customer_address, items } = req.body;

        const order = {
            user_id,
            customer_name,
            customer_email,
            customer_address,
            items,
        };

        const result = await insertOrder(order);
        res.status(201).json({ message: 'Tilaus tehty onnistuneesti', orderId: result.orderId });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await selectAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await selectOrderById(id);

        if (!order) {
            return res.status(404).json({ message: 'Tilausta ei löydy' });
        }

        if (!req.user.is_admin && req.user.id !== order.user_id) {
            return res.status(403).json({ message: 'Pääsy evätty' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const removeOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteOrder(id);
        res.json({ message: 'Tilaus poistettu onnistuneesti' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};