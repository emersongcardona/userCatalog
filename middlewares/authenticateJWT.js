require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
        return res.status(401).json({ message: "access denied - no JWT in header" });
    }
    let token;
    if (bearerToken.startsWith('Bearer ')) {
        token = bearerToken.slice(7, bearerToken.length);
    } else {
        token = bearerToken;
    }

    req.token = token;

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        next();
    });
};


module.exports = {authenticateJWT}