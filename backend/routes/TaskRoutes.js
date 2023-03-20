
const express = require('express');

const { createTask, allTasks, getTask, deleteTask, updateTask, updateCompletedTask } = require('../controllers/TaskController');
const Logger = require('../middlewares/Logger');

const router = express.Router();
router.post('/', Logger, createTask);
router.get('/', allTasks);
router.get('/:id', getTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.patch('/:id', updateCompletedTask);

module.exports = router;
