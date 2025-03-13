import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const router = express.Router();

// JWT token generálás
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Bejelentkezési route
router.post("/", async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: "Minden mező kötelező!" });
    }

    try {
        // Felhasználó keresése az adatbázisban
        const userQuery = await db.query("SELECT * FROM users WHERE name = $1", [name]);

        if (userQuery.rowCount === 0) {
            return res.status(400).json({ error: "Hibás felhasználónév vagy jelszó!" });
        }

        const user = userQuery.rows[0];

        // Jelszó ellenőrzése
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: "Hibás felhasználónév vagy jelszó!" });
        }

        // Token generálása
        const token = generateToken(user.id);

        // Felhasználó adatainak visszaküldése tokennel együtt
        res.json({
            user: {
                id: user.id,
                name: user.name,
                age: user.age,
                bio: user.bio,
                profile_pic: user.profile_pic,
                sex: user.sex,
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Szerver hiba!" });
    }
});

export default router;
