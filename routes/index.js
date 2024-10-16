const express = require('express');
const router = express.Router();
const campaignsController = require('../controllers/campaignsController');
const projectsController = require('../controllers/projectsController');
const managerController = require('../controllers/managerController');
const categoryController = require('../controllers/categoryController');

// Routes for task 1
router.get('/marketing/active-campaigns-average', campaignsController.getAverageActiveCampaignsBudget);
router.get('/engineering/completed-projects', projectsController.getCompletedProjects);
router.get('/manager/most-running-projects', managerController.getManagerWithMostRunningProjects);
router.get('/projects/same-team-members', projectsController.getProjectWithSameTeamMembers);


// Category-related routes
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
router.get('/categories/parent/:parent_id', categoryController.getCategoriesByParentId);


module.exports = router;
