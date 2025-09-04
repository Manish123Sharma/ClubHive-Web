const express = require('express');
const router = express.Router();
const geoController = require('../controllers/geoController');


router.get('/update/all', geoController.updateAll);

router.get('/getAllCountry', geoController.getAllCountry);

router.get('/getAllState', geoController.getAllState);

router.get('/getAllCity', geoController.getAllCity);

router.get('/getStatebyCountry', geoController.getStatebyCountry);

router.get('/getCitybyState', geoController.getCitybyState);

module.exports = router;
