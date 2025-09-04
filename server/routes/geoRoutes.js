const express = require('express');
const router = express.Router();
const geoController = require('../controllers/geoController');

router.get('/update/countries', geoController.updateCountries);

router.get('/update/states', geoController.updateStates);

router.get('/update/cities', geoController.updateCities);

module.exports = router;
