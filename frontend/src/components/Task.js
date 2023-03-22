import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

const Task = ({ task, index, deleteTask }) => {
  if (task) {
    return (
      <div className="TaskComponent task">
        <p>
          <b>{index}. </b>
          {task.name}
        </p>

        <div className='task-icons'>
          <FaCheckDouble color="green" />
          <FaEdit color="blue" />
          <FaRegTrashAlt color="darkred" onClick={() => {
            deleteTask(task._id)
          }} />
        </div>
      </div>
    );
  }

  return null;
};

export default Task;