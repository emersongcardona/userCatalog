const bcryptjs = require('bcryptjs');

function validatePassword(req, res, next) {
    const { password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }
    
    const salt = bcryptjs.genSaltSync();
    const encrypted_password = bcryptjs.hashSync(req.body.password, salt);
    delete req.body.password
    delete req.body.confirm_password
    req.body.encrypted_password = encrypted_password
    next();
}

module.exports = {
    validatePassword
};
