import express from 'express';
import registerRouter from './register.js';
import loginRouter from './login.js';
import logoutRouter from './logout.js';
import db from '../config/db.js';
import verifyRefreshToken from '../middleware/authMiddleware.js';
import findPeople from './findPeople.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', registerRouter);
router.post('/login', loginRouter);
router.post('/logout', logoutRouter);
router.post('/findPeople', findPeople);

router.post('/refresh-token', async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      
      if (!refreshToken) {
        return res.status(401).json({ message: 'Hiányzó refresh token' });
      }
  
      // Token ellenőrzése
      const decoded = await verifyRefreshToken(refreshToken);
  
      // Új tokenek generálása
      const newAccessToken = jwt.sign(
        { id: decoded.id, username: decoded.username },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
  
      const newRefreshToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );
  
      // Régi token revoke
      await db.query(
        'UPDATE refresh_tokens SET revoked = TRUE WHERE token = ?',
        [refreshToken]
      );
  
      // Új token mentése
      await db.query(
        'INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
        [newRefreshToken, decoded.id]
      );
  
      // Cookie beállítás
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
  
      res.json({ accessToken: newAccessToken });
      
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  });


export default router;