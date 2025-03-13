import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Nincs jogosultság!" });
    }

    try {
        // Token ellenőrzése és dekódolása
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Felhasználói adatokat beállítjuk a kérésben
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Érvénytelen token!" });
    }
};

export default protect;
