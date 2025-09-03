const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');


router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/updatePass', authController.updatePassword);

router.post('/registerAdmin', authController.registerAdmin);

router.post('/loginAdmin', authController.loginAdmin);

router.post('/updatePassAdmin', authController.updatePasswordAdmin);

router.get('/getAll', authController.getAll); // For getting all Users

router.get('/getAllAdmin', authController.getAllAdmin); // For Getting all Admins

router.get('/getUserbyName', authController.getUserbyName);

router.get('/getUserbyId', authController.getUserbyId);

router.get('/getAdminbyName', authController.getAdminbyName);

router.get('/getAdminbyId', authController.getAdminbyId);

module.exports = router;
