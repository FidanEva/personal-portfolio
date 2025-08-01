const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/project.controller');
const { uploadProjectMeida } = require('../middleware/multer');

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', uploadProjectMeida, createProject);
router.put('/:id', uploadProjectMeida, updateProject);
router.delete('/:id', deleteProject);

module.exports = router;