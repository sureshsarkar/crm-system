const express = require('express');
const { getAllEmployee, registrationController, loginController } = require('../controllers/employeeController');

// router object 
const router = express.Router();

// Get all user
router.get('/employee', getAllEmployee)


// register user
router.post('/register', registrationController)

// Login user
router.post('/login', loginController)

module.exports = router;