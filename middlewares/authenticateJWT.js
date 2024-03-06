require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    const token = bearerToken.split(" ")[1];
    req.token = token;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403).json({message: "access denied"});
            }
            next();
        });
    } else {
        res.sendStatus(401).json({message: "access denied"});
    }
};


module.exports = {authenticateJWT}