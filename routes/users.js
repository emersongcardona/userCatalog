var express = require('express');
var router = express.Router();
const {userList, userOne, userCreate, userUpdate, userDelete}  = require("../controllers/user.controller");
const {validatePassword} = require("../middlewares/password.validator")
 

router.get('/', userList);

router.get('/:id', userOne );

router.post('/', validatePassword , userCreate);

router.patch('/:id', userUpdate)

router.delete('/:id', userDelete);


module.exports = router;
