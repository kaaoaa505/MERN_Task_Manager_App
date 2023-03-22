import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import $ from 'jquery';

import Task from "./Task";
import TaskForm from "./TaskForm";
import { BACKEND_URL } from "../config/EnvVariables";

import LoadingImage from '../assets/loader.gif';

const TaskList = (props) => {

    useEffect(() => {
        // This runs only on mount (when the component appears)

        return () => {

            // This runs only once

            $(document).ready(function () {
                console.log("document loaded");
            });

            $(window).on("load", function () {
                console.log("window loaded");
            });
            console.log('Effect done.');
        };
    }, []);

    const backendTasksUrl = `${BACKEND_URL}/api/tasks`;

    // eslint-disable-next-line no-unused-vars
    const [tasks, setTasks] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(false);

    const getTasks = async () => {
        setIsLoading(true);

        try {
            const { data } = await axios.get(backendTasksUrl);
            setTasks(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        return async () => {
            await getTasks();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line no-unused-vars
    const [completedTasks, setCompletedTasks] = useState([]);

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

            await getTasks();
        } catch (error) {
            console.log(error);

            return toast.error(error.message);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            if (window.confirm('Are you sure?')) {
                await axios.delete(`${backendTasksUrl}/${taskId}`);

                await getTasks();
            }
        } catch (error) {
            console.log(error);

            return toast.error(error.message);
        }
    }

    return (
        <div className="TaskListComponent">
            <h2>Task Manager</h2>

            <TaskForm handleTaskFormSubmit={handleTaskFormSubmit} name={name} handleNameInputChange={handleNameInputChange} />

            <div className="--flex-between --pb">
                <p>
                    <b>Total Tasks: </b> {tasks.length}
                </p>
                <p>
                    <b>Completed Tasks: </b> 0
                </p>
            </div>

            <hr />
            {
                isLoading && (
                    <div className="--flex-center">
                        <img src={LoadingImage} alt="loading..." />
                    </div>
                )
            }

            {
                (isLoading || tasks.length === 0) ? (
                    <p>No task found.</p>
                ) : (
                    <>
                        {
                            (tasks.length > 0) && tasks.map((task, index) => (
                                <Task key={task._id} task={task} index={index + 1} deleteTask={deleteTask} />
                            ))
                        }
                    </>
                )
            }

        </div>
    );
};

export default TaskList;