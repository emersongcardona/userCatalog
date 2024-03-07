var express = require('express');
var router = express.Router();
const {userList, userOne, userCreate, userUpdate, userDelete}  = require("../../controllers/user.controller");
const {validateUserCreate} = require("../../middlewares/userCreate.validator")
const {validateUserUpdate} = require("../../middlewares/userUpdate.validator")
const {checkIdExists} = require("../../middlewares/userExists")


router.get('/', userList); 
router.get('/:id', checkIdExists ,userOne ); 
router.post('/',validateUserCreate, userCreate); 
router.patch('/:id', checkIdExists, validateUserUpdate , userUpdate)
router.delete('/:id', checkIdExists, userDelete); 

/**
 * @swagger
 * tags:
 *   name: users
 *   description: Endpoints related whit the CRUD for Users
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users info (only return name and email per user)
 *     tags: [users]
 *     security:
 *       - Authorization: []
 *     responses:
 *       '200':
 *         description: success, get a list of users
 *       '500':
 *         description: server Error
 */


/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: get user  data by id (the all user data)
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to show info
 *         schema:
 *           type: string
 *           format: string
 *     security:
 *       - Authorization: []
 *     responses:
 *       '200':
 *         description: success, get user  data by id
 *       '500':
 *         description: server Error
 */


/**
 * @swagger
 * /api/v1/users/:
 *   post:
 *     summary: create a new user in db
 *     tags: [users]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: user name
 *               email:
 *                 type: string
 *                 description: user email
 *               password:
 *                 type: string
 *                 description: user password, The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
 *               confirm_password: 
 *                 type: string
 *                 description: double confirm password to avoid errors 
 *     responses:
 *       '200':
 *         description: success, respond whit data from new user
 *       '500':
 *         description: server Error
 */


/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     summary: update email, name or password from selected user by id
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to show info
 *         schema:
 *           type: string
 *           format: string
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: new user name
 *               email:
 *                 type: string
 *                 description: new user email
 *               password:
 *                 type: string
 *                 description: user password, The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
 *               confirm_password: 
 *                 type: string
 *                 description: double confirm password to avoid errors, shoud send both password and confirm_password if want to update password
 *     
 *     responses:
 *       '200':
 *         description: success, respond whit updated data from user
 *       '500':
 *         description: server Error
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: soft deleted the selected user by id (update delete_at field)
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to show info
 *         schema:
 *           type: string
 *           format: string
 *     security:
 *       - Authorization: []
 *     responses:
 *       '200':
 *         description: success, respond whit info from deleted user
 *       '500':
 *         description: server Error
 */


module.exports = router
