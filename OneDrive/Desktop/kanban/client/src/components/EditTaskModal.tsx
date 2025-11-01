import React, { useEffect, useState } from 'react';
import { useCreateTask, useDeleteTaskMutation, useGetTaskById, useUpdateTask } from '../apis/taskData';
import { useParams } from 'react-router-dom';
import useTaskStore from '../statemanagment/taskStore';
import { InfinityIcon, X } from 'lucide-react';
import { useUpdateSubTask } from './../apis/subTaskData';

const EditTaskModal = ({ mode }) => {
  const { id } = useParams();

  const { isCreating, isError, isSuccess } = useCreateTask();
  const {
    showCreateTaskModal,
    hideCreateTaskModal,
    showEditTaskModal,
    hideEditTaskModal,
    activeTaskId,
    activeTaskData,
  } = useTaskStore();
  const{deleteMutation} = useDeleteTaskMutation()
  const { taskUpdateMutate } = useUpdateTask(activeTaskData.id);
  const [updateData, setUpdateData] = useState({
    id: activeTaskData.id,
    title: activeTaskData.title,
    description: activeTaskData.description,
    subTasks: activeTaskData.subTasks,
  });

  const handleInputChange = (index, value) => {
    const intitalData = { ...updateData };
    intitalData.subTasks[index].title = value;
    setUpdateData(intitalData);
  };
  useEffect(() => {
    console.log(updateData);
  }, [updateData]);

  const handlAddSubTaskInput = () => {
    const currentTaskdata = {
      ...updateData,
      subTasks: [
        ...updateData.subTasks,
        {
          title: '',
          task_id: activeTaskData.id,
          status: 'TODO',
          description: 'Add description',
        },
      ],
    };
    setUpdateData(currentTaskdata);
  };

  const handleCancelTaskInput = (index) => {
    const intialData = { ...updateData };
    const filteredSubtask = intialData.subTasks.filter(
      (_, i: number) => i !== index
    );
    setUpdateData({ ...intialData, subTasks: filteredSubtask });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    taskUpdateMutate(updateData, {
      onSuccess: () => {
        console.log('Successfully updated');
                setTimeout(hideEditTaskModal, 2000);

      },
      onError: (error) => {
        console.error('Update failed:', error);
        // Optionally revert status on error
      },
    });
  };



  return (
    <article className='sub-task-modal'>
      <div className='grid gap-y-1 p-y-2 p-x-1'>
        <p>Edit Task</p>

        <form onSubmit={handleSubmit}>
          <div className='grid gap-y-1'>
            <div>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                style={{ width: '100%', padding: '.4rem' }}
                name='title'
                value={updateData.title}
                onChange={(e) =>
                  setUpdateData({ ...updateData, title: e.target.value })
                }
                placeholder='title'
                disabled={isCreating}
              />
            </div>
            <div>
              <label htmlFor='description'>Description</label>

              <textarea
                style={{ width: '100%', padding: '.4rem' }}
                name='description'
                value={updateData.description}
                onChange={(e) =>
                  setUpdateData({ ...updateData, description: e.target.value })
                }
                placeholder='description'
                disabled={isCreating}
              />
            </div>
            <div>
              <label>Subtasks</label>
              <div className='grid gap-y-05 mbe-1'>
                {updateData.subTasks.map((subTask, index) => (
                  <div className='flex'>
                    <input
                      type='text'
                      style={{ width: '100%', padding: '.4rem' }}
                      name='title'
                      value={subTask.title}
                      placeholder='title'
                      disabled={isCreating}
                      key={`subtaskInput${index}`}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    <button
                      type='button'
                      onClick={() => handleCancelTaskInput(index)}>
                      <X />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type='button'
                onClick={handlAddSubTaskInput}
                style={{
                  width: '100%',
                  paddingBlock: '.6rem',
                  borderRadius: '1rem',
                  border: 'none',
                  outline: 'none',
                }}>
                <span>+ </span> Add New SubTask
              </button>
            </div>
            <button
              type='submit'
              className='p-x-1 p-y-05 rounded-sm bg-blue-md rounded-md'
              style={{
                borderRadius: '1rem',
                border: 'none',
                outline: 'none',
                color: '#ffff',
                paddingBlock: '.6rem',
              }}>
              {isCreating ? 'Creating' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default EditTaskModal;
