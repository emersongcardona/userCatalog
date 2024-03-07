var express = require('express');
var router = express.Router();
const {findUser} = require('../controllers/auth.controller')
const {validateAuth} = require('../middlewares/validateAuth')

router.post('/', validateAuth , findUser);

/**
* @swagger
* tags:
*   name: login
*   description: Endpoints related whit authentication and return jwt
*/

/**
* @swagger
* /login:
*   post:
*     summary: Login  in the application to get jtw for protected routes
*     tags: [login]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 description: user registered email
*               password:
*                 type: string
*                 description: user registered password
*     responses:
*       '200':
*         description: success, return jwt for  access to private routes
*       '401':
*         description: email or password incorrect
*/

module.exports = router;