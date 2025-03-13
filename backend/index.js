import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Adatbázis csatlakozás
connectDB();

// API útvonalak
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



