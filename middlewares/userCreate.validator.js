const bcryptjs = require('bcryptjs');
const {check} = require('express-validator');
const {validateResult} = require('../helpers/validateHelper')
const {emailExists} = require('./emailCheck')

const  validateUserCreate = [
    check(['name','email','password','confirm_password']).isString().notEmpty(),
    check('email').isEmail().custom(emailExists),

    
    //make sure password and password confirmation match 
    check('confirm_password')
    .custom((value, { req }) => {
        if (value === req.body.password) return true
        throw new Error('password and password confirmation doesnt match');
    }),
    
    //make sure password has  at least one uppercase, lowercase letter and
    check(['password']).isStrongPassword(),

    //encrypt password
    check(['password']).custom((value, { req }) => {
        const salt = bcryptjs.genSaltSync();
        const encrypted_password = bcryptjs.hashSync(value, salt);
        req.body.encrypted_password = encrypted_password
        return true
    }),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = {validateUserCreate};