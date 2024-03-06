var express = require('express');
var router = express.Router();
const {findUser} = require("../controllers/auth.controller")


router.post('/', findUser);

module.exports = router;