const express = require('express');
const {addTask } = require('../controllers/taskController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');
const router = express.Router();


router.post('/add',adminAuthMiddleware, addTask);


module.exports = router;