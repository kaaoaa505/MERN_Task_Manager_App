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
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const allTasks = async (_req, res) => {
    try {
        const tasks = await TaskModel.find();
        return res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        console.log(error);
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
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = { createTask, allTasks, getTask };