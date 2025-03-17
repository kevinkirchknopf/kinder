import jwt from 'jsonwebtoken';
import db from '../config/db.js';

export const verifyRefreshToken = async (token) => {
  try {
    // 1. Token ellenőrzése
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
    // 2. Adatbázis ellenőrzés
    const [rows] = await db.query(
      `SELECT * FROM refresh_tokens 
       WHERE token = ? 
         AND user_id = ? 
         AND revoked = FALSE 
         AND expires_at > NOW()`,
      [token, decoded.id]
    );

    if (!rows.length) throw new Error('Invalid refresh token');
    return decoded;
  } catch (error) {
    throw new Error('Refresh token invalidálódott');
  }
};

export default verifyRefreshToken;
