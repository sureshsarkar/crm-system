const express = require('express');
const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');
const { createProject,editProject,deleteProject,getAllProject,getProjectsByIds } = require('../controllers/projectController');

const router = express.Router();

router.get('/get-all',adminAuthMiddleware,getAllProject);
router.post('/add',adminAuthMiddleware,createProject);
router.put('/edit-project/:id',adminAuthMiddleware,editProject);
router.delete('/delete/:id',adminAuthMiddleware,deleteProject);
router.get('/get-projects-by-ids',adminAuthMiddleware,getProjectsByIds);


module.exports = router;