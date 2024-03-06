const {validationResult} = require('express-validator');

const validateResult = (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errores", errors);
        return res.status(403).json({ errors: errors.array() });
    }
    next();
}

module.exports = {validateResult}