
const express = require('express');

const { createTask, allTasks, getTask } = require('../controllers/TaskController');
const Logger = require('../middlewares/Logger');

const router = express.Router();
router.post('/api/tasks', Logger, createTask);
router.get('/api/tasks', allTasks);
router.get('/api/tasks/:id', getTask);

module.exports = router;
