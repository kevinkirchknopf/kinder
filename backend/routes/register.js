import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password, sex, age, bio, profile_pic } = req.body;

    // Kötelező mezők ellenőrzése
    if (!username || !password || !sex) {
      return res.status(400).json({ 
        message: "Kötelező mezők: név, jelszó, nem" 
      });
    }

    // Felhasználónév egyediség ellenőrzése
    const [existingUser] = await db.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ 
        message: "Ez a felhasználónév már foglalt" 
      });
    }

    // Jelszó titkosítás
    const hashedPassword = await bcrypt.hash(password, 12);

    // Felhasználó létrehozása
    const [result] = await db.query(
      `INSERT INTO users 
        (username, password_hash, sex, age, bio) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        username,
        hashedPassword,
        sex,
        age || null,
        bio || null,
        profile_pic || null
      ]
    );

    // JWT token generálása
    const token = jwt.sign(
      {
        id: result.insertId,
        username: username,
        sex: sex
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: "Sikeres regisztráció!",
      token,
      user: {
        id: result.insertId,
        username,
        sex,
        age: age || null,
        bio: bio || null
      }
    });

  } catch (error) {
    console.error("Regisztrációs hiba:", error);
    res.status(500).json({ 
      message: "Szerverhiba a regisztráció során",
      error: process.env.NODE_ENV === 'development' ? error : null
    });
  }
});

export default router;