var express = require('express');
var router = express.Router(); 
var Event = require('../../models/event');
var eventsCtrl = require('../../controllers/eventsCtrl')

/*-- private routes --*/
router.post('/create', eventsCtrl.create);
router.post('/join', eventsCtrl.join);

module.exports = router; 