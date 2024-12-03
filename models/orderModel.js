import promisePool from '../config/db.js';

export const insertOrder = async (order) => {
    const connection = await promisePool.getConnection();
    try {
        await connection.beginTransaction();

        const orderSql = 'INSERT INTO Orders (user_id, customer_name, customer_email, customer_address) VALUES (?, ?, ?, ?)';
        const orderParams = [
            order.user_id,
            order.customer_name,
            order.customer_email,
            order.customer_address,
        ];
        const [orderResult] = await connection.query(orderSql, orderParams);
        const orderId = orderResult.insertId;

        const orderItemsSql = 'INSERT INTO OrderItems (order_id, item_id, quantity, price_at_purchase) VALUES ?';
        const orderItemsData = order.items.map((item) => [
            orderId,
            item.item_id,
            item.quantity,
            item.price_at_purchase,
        ]);
        await connection.query(orderItemsSql, [orderItemsData]);

        await connection.commit();
        return { orderId };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const selectAllOrders = async () => {
    const sql = 'SELECT * FROM Orders';
    const [rows] = await promisePool.query(sql);
    return rows;
};

export const selectOrderById = async (id) => {
    const orderSql = 'SELECT * FROM Orders WHERE id = ?';
    const [orderRows] = await promisePool.query(orderSql, [id]);
    const order = orderRows[0];

    if (!order) {
        return null;
    }

    const itemsSql = `
    SELECT oi.item_id, oi.quantity, oi.price_at_purchase, i.name, i.description
    FROM OrderItems oi
    JOIN Items i ON oi.item_id = i.id
    WHERE oi.order_id = ?
  `;
    const [itemsRows] = await promisePool.query(itemsSql, [id]);

    order.items = itemsRows;
    return order;
};

export const deleteOrder = async (id) => {
    const connection = await promisePool.getConnection();
    try {
        await connection.beginTransaction();

        const deleteOrderItemsSql = 'DELETE FROM OrderItems WHERE order_id = ?';
        await connection.query(deleteOrderItemsSql, [id]);

        const deleteOrderSql = 'DELETE FROM Orders WHERE id = ?';
        const [result] = await connection.query(deleteOrderSql, [id]);

        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};