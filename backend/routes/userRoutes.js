const express = require('express');
const { 
      getAllEmployee,
      registrationController,
      loginController,
      logoutController, 
      myProfile, 
      deleteEmployee,
      getEmployee, 
      editEmployeeController 
    } = require('../controllers/employeeController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');

// router object 
const router = express.Router();

router.get('/dashboard',adminAuthMiddleware, deleteEmployee);

// Get all employee
router.get('/employee', getAllEmployee);
// Get one employee
router.get('/myprofile',adminAuthMiddleware, myProfile);

// register employee
router.post('/register', registrationController);

// Login employee
router.post('/login',loginController);
router.get('/logout',adminAuthMiddleware, logoutController);
router.delete('/delete-employee/:id',adminAuthMiddleware, deleteEmployee);
// router.put('/edit-employee/:id', myProfile);
router.put('/edit-employee/:id', editEmployeeController);

module.exports = router;