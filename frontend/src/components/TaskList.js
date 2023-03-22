import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

import Task from "./Task";
import TaskForm from "./TaskForm";

const TaskList = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const backendTasksUrl = `${backendUrl}/api/tasks`;

    let tasks = null;

    const tasksResonse = async () => {
        return await axios.get(backendTasksUrl);
    };

    if(tasks === null){
        tasksResonse().then((response) => {
            tasks = response.data;
            console.log('---tasks is: ', tasks);
        });
    }

    const [formData, setFormData] = useState({
        name: '',
        completed: false
    });

    const { name } = formData;

    const handleNameInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTaskFormSubmit = async (event) => {
        event.preventDefault();

        if (name === '') return toast.error('Task name can not be empty.');

        try {
            await axios.post(backendTasksUrl, formData);

            toast.success('Task added successfully.')

            setFormData({
                ...formData,
                name: ''
            });
        } catch (error) {
            console.log(error);

            return toast.error(error.message);
        }
    };

    return (
        <div className="TaskListComponent">
            <h2>Task Manager</h2>

            <TaskForm handleTaskFormSubmit={handleTaskFormSubmit} name={name} handleNameInputChange={handleNameInputChange} />

            <div className="--flex-between --pb">
                <p>
                    <b>Total Tasks: </b> 0
                </p>
                <p>
                    <b>Completed Tasks: </b> 0
                </p>
            </div>

            <hr />

            <Task />
        </div>
    );
};

export default TaskList;