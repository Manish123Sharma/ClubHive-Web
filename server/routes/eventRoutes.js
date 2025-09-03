const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.post('/createEvent', eventsController.createEvent);

router.delete('/deleteEvent', eventsController.deleteEvent);

router.post('/updateEvent', eventsController.updateEvent);

router.get('/getAll', eventsController.getAll); //For getting all Events

module.exports = router;
