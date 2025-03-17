import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));