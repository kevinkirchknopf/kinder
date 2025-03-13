import express from "express";
import protect from "../middleware/authMiddleware.js";
import db from "../config/db.js";

const router = express.Router();

// Profil lekérése (védett útvonal)
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await db.query("SELECT id, name, age, bio, profile_pic, sex FROM users WHERE id = $1", [req.user.id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Szerver hiba!" });
    }
});

export default router;
