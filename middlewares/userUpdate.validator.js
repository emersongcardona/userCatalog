const bcryptjs = require('bcryptjs');
const {check} = require('express-validator');
const {validateResult} = require('../helpers/validateHelper')
const {emailExists} = require('./emailCheck')

const  validateUserUpdate = [
    //at least one value shoudt be  changed to update the user info.
    check().custom((value, { req }) => {
        console.log("body en req: ", req.body)
        if (Object.keys(req.body).length === 0) {
            throw new Error('Request body is empty, wont update user');
        }
        return true;
    }),

    //avoid boolean values
    check(['name','email','password','confirm_password']).isString().optional(),

    //validates if email is already taken by other user
    check('email').isEmail().custom(emailExists).optional(),

    //make sure both values are present in req.body
    check(['password', 'confirm_password']).custom((values, { req }) => {
        const { password, confirm_password } = req.body;
        if ((!password && !confirm_password) || (password && confirm_password)) {
            return true;
        } else {
            throw new Error('Both password and confirm_password are required if you want to change the password');
        }
    })
    .optional(),

    //make sure password and password confirmation match 
    check('confirm_password')
    .custom((value, { req }) => {
        if (value === req.body.password) return true
        throw new Error('password and password confirmation doesnt match');
    }).optional(),

    //make sure password has  at least one uppercase, lowercase letter and
    check(['password']).isStrongPassword().optional(),
        
    //encrypt password
    check(['password']).custom((value, { req }) => {
        const salt = bcryptjs.genSaltSync();
        const encrypted_password = bcryptjs.hashSync(value, salt);
        req.body.encrypted_password = encrypted_password
        return true
    })
    .optional(),

    (req, res, next) =>{
        validateResult(req, res, next)
    }
]

module.exports = {validateUserUpdate};