const express = require('express');
const { getAllEmployee, registrationController, loginController,logoutController, myProfile, deleteEmployee } = require('../controllers/employeeController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');

// router object 
const router = express.Router();

// Get all employee
router.get('/employee',adminAuthMiddleware, getAllEmployee)
// Get one employee
router.get('/myprofile',adminAuthMiddleware, myProfile)

// register employee
router.post('/register', registrationController)

// Login employee
router.post('/login',loginController)
router.get('/logout',adminAuthMiddleware, logoutController)
router.get('/delete/:id',adminAuthMiddleware, deleteEmployee)

module.exports = router;