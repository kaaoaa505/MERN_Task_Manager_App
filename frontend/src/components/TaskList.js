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
        console.log('Effect start.' + new Date().toISOString());

        return () => {
            // This runs only once

            $(document).ready(function () {
                console.log("document loaded");
            });

            $(window).on("load", function () {
                console.log("window loaded");
            });

            console.log('Effect return.');
        };
    }, []);

    const backendTasksUrl = `${BACKEND_URL}/api/tasks`;

    // eslint-disable-next-line no-unused-vars
    const [tasks, setTasks] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [taskIdToEdit, setTaskIdToEdit] = useState('');

    const [isEditing, setIsEditing] = useState(false);

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
            if (isEditing) {
                await axios.put(`${backendTasksUrl}/${taskIdToEdit}`, formData);
                toast.success('Task updated successfully.');
                setIsEditing(false);
                setTaskIdToEdit('');
            } else {
                await axios.post(backendTasksUrl, formData);
                toast.success('Task added successfully.');
            }

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

                toast.success('Task deleted successfully.')

                await getTasks();
            }
        } catch (error) {
            console.log(error);

            return toast.error(error.message);
        }
    }

    const getTaskForEdit = (task) => {
        setFormData({
            name: task.name,
            completed: false
        });

        setTaskIdToEdit(task._id);

        setIsEditing(true);
    }

    const setTaskToCompleted = async (task) => {
        try {
                await axios.patch(`${backendTasksUrl}/${task._id}`, {completed: !task.completed});

                toast.success('Task set to completed successfully.')

                await getTasks();
        } catch (error) {
            console.log(error);

            return toast.error(error.message);
        }
    }

    return (
        <div className="TaskListComponent">
            <h2>Task Manager</h2>

            <TaskForm
                handleTaskFormSubmit={handleTaskFormSubmit}
                name={name}
                handleNameInputChange={handleNameInputChange}
                taskIdToEdit={taskIdToEdit}
                isEditing={isEditing}
            />

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
                                <Task 
                                key={task._id} 
                                task={task} 
                                index={index + 1} 
                                deleteTask={deleteTask} 
                                getTaskForEdit={getTaskForEdit}
                                setTaskToCompleted={setTaskToCompleted}
                                 />
                            ))
                        }
                    </>
                )
            }

        </div>
    );
};

export default TaskList;