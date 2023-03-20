
const express = require('express');

const { createTask, allTasks, getTask, deleteTask, updateTask } = require('../controllers/TaskController');
const Logger = require('../middlewares/Logger');

const router = express.Router();
router.post('/api/tasks', Logger, createTask);
router.get('/api/tasks', allTasks);
router.get('/api/tasks/:id', getTask);
router.delete('/api/tasks/:id', deleteTask);
router.put('/api/tasks/:id', updateTask);

module.exports = router;
