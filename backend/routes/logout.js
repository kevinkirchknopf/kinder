
import express from 'express';
import db from '../config/db.js';

const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (refreshToken) {
      // Token törlése az adatbázisból
      await db.query(
        'DELETE FROM refresh_tokens WHERE token = ?',
        [refreshToken]
      );
    }

    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;