
const {check} = require('express-validator');
const {validateResult} = require('../helpers/validateHelper')
const {trimFields} = require('../helpers/trimFields')


const  validateAuth = [
    trimFields(['email', 'password']),
    check(['email','password' ]).isString().notEmpty(),
    check('email').isEmail(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = {validateAuth};