const express = require('express');
const router = express.Router();
const updateProfileController = require('../controllers/updateProfileController');
const updateProfileAdminController = require('../controllers/updateProfileAdminController');

router.post('/updateProfile', updateProfileController.updateProfile);

router.post('/updateProfileAdmin', updateProfileAdminController.updateProfileAdmin);

router.post('/profilePic', updateProfileController.uploadProfilePic);

router.post('/profilePicAdmin', updateProfileAdminController.uploadProfilePicAdmin);

module.exports = router;