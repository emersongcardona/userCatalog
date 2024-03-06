var express = require('express');
var router = express.Router();
const {userList, userOne, userCreate, userUpdate, userDelete}  = require("../controllers/user.controller");
const {validateUserCreate} = require("../middlewares/userCreate.validator")
const {validateUserUpdate} = require("../middlewares/userUpdate.validator")
const {checkIdExists} = require("../middlewares/userExists")
 

router.get('/', userList);

router.get('/:id', checkIdExists ,userOne );

router.post('/',validateUserCreate, userCreate);

router.patch('/:id', checkIdExists, validateUserUpdate , userUpdate)

router.delete('/:id', checkIdExists, userDelete);


module.exports = router;
