import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

const Task = () => {
  return (
    <div className="TaskComponent task">
      <p>
        <b>1.</b>
        Task 1
      </p>

      <div className='task-icons'>
        <FaCheckDouble color="green" />
        <FaEdit color="blue" />
        <FaRegTrashAlt color="darkred" />
      </div>
    </div>
  );
};

export default Task;