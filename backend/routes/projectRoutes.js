const express = require('express');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');
const { createProject,editProject,deleteProject,getAllProject } = require('../controllers/projectController');

const router = express.Router();

router.get('/get-all',getAllProject);
router.post('/add',adminAuthMiddleware,createProject);
router.put('/edit-project/:id',adminAuthMiddleware,editProject);
router.delete('/delete/:id',adminAuthMiddleware,deleteProject);


module.exports = router;