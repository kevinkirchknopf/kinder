import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post('/findPeople', async (req, res) => {
    const { searchedSex, minAge, maxAge } = req.body;


    if (!searchedSex || minAge === undefined || maxAge === undefined) {
        return res.status(400).json({ message: 'Hiányzó adatok: searchedSex, minAge és maxAge szükséges.' });
    }

   
    if (minAge < 0 || maxAge < 0 || minAge > maxAge) {
        return res.status(400).json({ message: 'Érvénytelen életkor tartomány.' });
    }

    try {
       
        const [people] = await db.execute(
            'SELECT * FROM users WHERE sex = ? AND age BETWEEN ? AND ?',
            [searchedSex, minAge, maxAge]
        );

        if (people.length === 0) {
            return res.status(404).json({ message: 'Nincs találat a megadott feltételek alapján.' });
        }

       
        res.status(200).json(people);
    } catch (error) {
        console.error('Hiba az adatbázis lekérdezés közben:', error);
        res.status(500).json({ message: 'Szerverhiba' });
    }
});

export default router;