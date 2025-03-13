const express = require('express');
const router = express.Router();
const db = require('../db'); // Fontos: a relatív útvonal!

router.post('/register', async (req, res) => {
  try {
    // Példa query
    const result = await db.query(
      'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *',
      [req.body.email, req.body.password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;