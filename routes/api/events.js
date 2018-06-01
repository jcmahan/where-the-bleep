var express = require('express');
var router = express.Router(); 
var Event = require('../../models/event');
var eventsCtrl = require('../../controllers/eventsCtrl')

/*-- private routes --*/
router.get('/', checkAuth, eventsCtrl.index);
router.post('/', checkAuth, eventsCtrl.create);
router.post('/:id/join', checkAuth, eventsCtrl.join);

/*----- Helper Functions -----*/

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'not authenticated'});
}

module.exports = router; 