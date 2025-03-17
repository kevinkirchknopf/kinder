import express from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';


const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Felhasználó keresése
    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    
    // Jelszó ellenőrzés
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Tokenek generálása
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_SECRET,
      { expiresIn: '3h' }
    );

    // Refresh token mentése
    await db.query(
      'INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)',
      [refreshToken, user.id]
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;