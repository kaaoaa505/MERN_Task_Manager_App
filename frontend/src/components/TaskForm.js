import React from 'react';

const TaskForm = ({handleTaskFormSubmit, name, handleNameInputChange, taskIdToEdit, isEditing}) => {
    return (
        <div className="TaskFormComponent">
            <form className='task-form' onSubmit={handleTaskFormSubmit}>
                <input 
                type='text' 
                placeholder='Add a task' 
                name='name' 
                value={name}
                onChange={handleNameInputChange} />

                <button type='submit'>{isEditing ? 'Edit' : 'Add'}</button>
            </form>
        </div>
    );
};

export default TaskForm;