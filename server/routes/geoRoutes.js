const express = require('express');
const router = express.Router();
const geoController = require('../controllers/geoController');


router.get('/update/all', geoController.updateAll);

module.exports = router;
