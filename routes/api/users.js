var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var usersCtrl = require('../../controllers/users');

/*-- public routes --*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

module.exports = router; 