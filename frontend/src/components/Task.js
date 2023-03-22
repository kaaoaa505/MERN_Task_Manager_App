import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

const Task = ({name, index}) => {
  

  return (
    <div className="TaskComponent task">
      <p>
        <b>{index}. </b>
        {name}
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