import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  try {
    const { name, age, bio, sex, password, profile_pic } = req.body;

    if (!name || !password || !sex) {
      return res.status(400).json({ message: 'Kötelező mezők: név, jelszó, nem' });
    }

    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE name = ?',
      [name]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'A felhasználónév foglalt' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await pool.query(
      `INSERT INTO users 
      (name, age, bio, sex, profile_pic, password_hash) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, age || null, bio || null, sex, profile_pic || null, hashedPassword]
    );

    res.status(201).json({ message: 'Sikeres regisztráció' });
  } catch (error) {
    console.error('Regisztrációs hiba:', error);
    res.status(500).json({ message: 'Szerver hiba' });
  }
};