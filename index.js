import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
app.use(cors({
    origin: 'https://users.metropolia.fi',
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Palvelin käynnissä portissa ${PORT}`);
});