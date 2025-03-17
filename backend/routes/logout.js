
import express from 'express';
import db from '../config/db.js';

const router = express.Router();
router.post('/logout', async (req, res) => {
  try {
    console.log('Bejövő cookie:', req.cookies); // <- Új sor
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      console.log('Nincs refresh token'); // <- Új sor
      return res.status(400).json({ message: 'Hiányzó token' });
    }

    const [result] = await db.query(
      'UPDATE refresh_tokens SET revoked = 1 WHERE token = ?',
      [refreshToken]
    );

    console.log('Adatbázis eredmény:', result); // <- Új sor

    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Sikeres kijelentkezés' });
    
  } catch (error) {
    console.error('HIBA:', error); // <- Részletes hiba
    res.status(500).json({ message: 'Szerverhiba' });
  }
});

export default router;