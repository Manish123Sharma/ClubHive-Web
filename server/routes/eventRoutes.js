const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.post('/createEvent', eventsController.createEvent);
router.delete('/deleteEvent', eventsController.deleteEvent);
router.post('/updateEvent', eventsController.updateEvent);

module.exports = router;