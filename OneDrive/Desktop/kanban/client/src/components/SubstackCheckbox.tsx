import React, { useRef, useState } from 'react';
import { useUpdateSubTask } from '../apis/subTaskData';
import { useDarkMode } from '../context/DarkModeContext';

const SubstackCheckbox = (props) => {
  const { updateMutation } = useUpdateSubTask(parseInt(props.id));
  const ref = useRef(null)
  // Local checkbox state mirrors props.status initially
  const [isChecked, setIsChecked] = useState(props.status === 'DONE');
  const{mode}= useDarkMode()
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked); // instant UI feedback

    const newStatus = newChecked === true ? 'DONE' : 'DOING';

    const tdata = {
      id: props.id,
      title: props.title,
      description: props.description,
      status: newStatus,
      task_id: props.task_id,
    };

    updateMutation(tdata, {
      onSuccess: (data) => console.log('Subtask updated', data),
      onError: (error) => {
        console.log('Error updating subtask:', error);
        // Revert checkbox if update fails
        setIsChecked(!newChecked);
      },
    });
  };
  // className={`${mode === 'light' ? 'bg-light' : 'bg-darker'} content`}

  return (
    <div
      className={`subtaskcheckbox flex gap-x-1 item-center mbe-05 p-x-05 p-y-05 rounded-sm color-dark-white ${
        mode === 'light' ? 'bg-blue-sm' : 'bg-dark'
      }`}>
      <input
        ref={ref}
        type='checkbox'
        onChange={handleStatusChange}
        checked={isChecked}
      />
      <p>{props.title}</p>
    </div>
  );
};

export default SubstackCheckbox;
