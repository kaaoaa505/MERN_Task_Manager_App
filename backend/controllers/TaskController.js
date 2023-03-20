const HttpStatusCodes = require('http-status-codes');

const TaskModel = require("../models/TaskModel");

const StatusCodes = HttpStatusCodes.StatusCodes;

const bson = require('bson');
const ObjectID = bson.ObjectId;

const createTask = async (req, res) => {
    try {
        req.body._id = new ObjectID().toHexString();
        
        const task = await TaskModel.create(req.body);

        return res.status(StatusCodes.OK).json(task);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const allTasks = async (_req, res) => {
    try {
        const tasks = await TaskModel.find();
        return res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findById(id);

        if(!task)
            return res.status(StatusCodes.NOT_FOUND).json({error: `Task with id ${id} Not-Found.`});

        return res.status(StatusCodes.OK).json(task);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findByIdAndDelete(id);

        if(!task)
            return res.status(StatusCodes.NOT_FOUND).json({error: `Task with id ${id} Not-Found.`});

        return res.status(StatusCodes.NO_CONTENT).json({});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findByIdAndUpdate({_id: id}, req.body, {
            new: true,
            runValidators: true
        });

        if(!task)
            return res.status(StatusCodes.NOT_FOUND).json({error: `Task with id ${id} Not-Found.`});

        return res.status(StatusCodes.ACCEPTED).json(task);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const updateCompletedTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findByIdAndUpdate({_id: id}, {completed: req.body.completed}, {
            new: true,
            runValidators: true
        });

        if(!task)
            return res.status(StatusCodes.NOT_FOUND).json({error: `Task with id ${id} Not-Found.`});

        return res.status(StatusCodes.ACCEPTED).json(task);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = { createTask, allTasks, getTask, deleteTask, updateTask, updateCompletedTask };