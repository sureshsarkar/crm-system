const express = require('express');
const {addTask, getAllTasks, deleteTask,editTask,getById, getByJoin,taskFindDynamicController } = require('../controllers/taskController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');
const router = express.Router();


router.post('/add',adminAuthMiddleware, addTask);
router.get('/get-all',adminAuthMiddleware, getAllTasks);
router.delete('/delete/:id',adminAuthMiddleware, deleteTask);
router.put('/edit-task/:id',adminAuthMiddleware, editTask);
router.get('/get-by-id/:id',adminAuthMiddleware, getById);
router.get('/get-by-join/:id',adminAuthMiddleware, getByJoin);
router.post('/task-finddynamic',adminAuthMiddleware,taskFindDynamicController);



module.exports = router;