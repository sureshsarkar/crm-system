const express = require('express');
const {addTimer,getAllTimers,deleteTimer,editTimer,getById,getByTaskId } = require('../controllers/timerController');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');
const router = express.Router();


router.post('/add',adminAuthMiddleware, addTimer);
router.get('/get-all',adminAuthMiddleware, getAllTimers);
router.delete('/delete/:id',adminAuthMiddleware, deleteTimer);
router.post('/edit',adminAuthMiddleware, editTimer);
router.get('/get-by-id/:id',adminAuthMiddleware, getById);
router.get('/get-by-taskid/:id',adminAuthMiddleware, getByTaskId);


module.exports = router;