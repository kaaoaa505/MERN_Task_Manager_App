
const express = require('express');
const HttpStatusCodes = require('http-status-codes');

const TaskModel = require('../models/TaskModel');
const Logger = require('../middlewares/Logger');

const router = express.Router();

const StatusCodes = HttpStatusCodes.StatusCodes;

router.get('/', (_req, res) => {
    res.send('Home page')
});

router.post('/api/tasks', Logger, async (req, res) => {
    try {
        const task = await TaskModel.create(req.body);
        return res.status(StatusCodes.OK).json(task);
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
    }
});

router.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        return res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
    }
});

module.exports = router;