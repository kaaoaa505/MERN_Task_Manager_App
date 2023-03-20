const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a task']
        },
        completed: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const TaskModel = mongoose.model('task', taskSchema); 

module.exports = TaskModel;