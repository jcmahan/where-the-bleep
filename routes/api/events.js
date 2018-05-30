var express = require('express');
var router = express.Router(); 
var Event = require('../../models/event');
var eventsCtrl = require('../../controllers/eventsCtrl')

/*-- private routes --*/
router.get('/', eventsCtrl.index);
router.post('/', eventsCtrl.create);
router.post('/:id/join', eventsCtrl.join);

module.exports = router; 