import express from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';


const router = express.Router();
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validáció
    if (!username || !password) {
      return res.status(400).json({ message: 'Hiányzó felhasználónév vagy jelszó' });
    }

    // Felhasználó keresése
    const [users] = await db.query(
      'SELECT id, username, password_hash, sex, age FROM users WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Érvénytelen hitelesítő adatok' }); // Egységes hibaüzenet
    }

    const user = users[0];
    
    // Jelszó ellenőrzés JAVÍTVA
    const validPassword = await bcrypt.compare(password, user.password_hash); // ← Javított mezőnév
    if (!validPassword) {
      return res.status(401).json({ message: 'Érvénytelen hitelesítő adatok' }); // Egységes hibaüzenet
    }
    await db.query(
      'DELETE FROM refresh_tokens WHERE user_id = ?',
      [user.id]
    );
    // Tokenek generálása
    const accessToken = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        sex: user.sex,
        age: user.age
      },
      process.env.JWT_SECRET, // .env-ben JWT_SECRET legyen
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET, // .env-ben JWT_REFRESH_SECRET
      { expiresIn: '7d' } // Hosszabb élettartam
    );

    // Refresh token mentése
    await db.query(
      'INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)',
      [refreshToken, user.id]
    );

    // Cookie beállítások javítva
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax', // Strict helyett Lax a jobb kompatibilitásért
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 nap
      path: '/api/auth' // Csak a refresh endpointnak küldje
    });

    // Válaszban több user adat
    res.json({ 
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        sex: user.sex,
        age: user.age
      }
    });

  } catch (error) {
    console.error('Bejelentkezési hiba:', error);
    res.status(500).json({ 
      message: 'Szerverhiba'
    });
  }
});


export default router;