// tokenCleanup.js
import db from './config/db.js';
import cron from 'node-cron';

const cleanupTokens = async () => {
  try {
    // MySQL kompatibilis törlési parancs
    const [result] = await db.query(`
      DELETE FROM refresh_tokens 
      WHERE revoked = TRUE 
         OR expires_at < NOW()
    `);
    
    console.log(`Törölve ${result.affectedRows} érvénytelen token`);
  } catch (error) {
    console.error('Hiba a token tisztítás közben:', error);
  }
};


cron.schedule('0 3 * * *', cleanupTokens, {
  timezone: "Europe/Budapest"
});

