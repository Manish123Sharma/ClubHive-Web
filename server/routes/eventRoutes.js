const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.post('/createEvent', eventsController.createEvent);

router.delete('/deleteEvent', eventsController.deleteEvent);

router.post('/updateEvent', eventsController.updateEvent);

router.get('/getAll', eventsController.getAll); //For getting all Events

router.get('/getEventbyName', eventsController.getEventbyName);

router.get('/getEventbyCity', eventsController.getEventbyCity);

router.get('/getEventbyCountry', eventsController.getEventbyCountry);

router.get('/getEventbyState', eventsController.getEventbyState);

module.exports = router;
