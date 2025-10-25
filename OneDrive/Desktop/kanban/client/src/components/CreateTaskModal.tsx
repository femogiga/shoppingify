import React, { useEffect, useState } from 'react';
import { useCreateTask } from '../apis/taskData';
import { useParams } from 'react-router-dom';
import useTaskStore from '../statemanagment/taskStore';

const CreateTaskModal = () => {
  const { id } = useParams();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    project_id: parseInt(id),
    status: 'TODO',
  });
  const { createTask, isCreating, isError, isSuccess } = useCreateTask();
  const { showCreateTaskModal, hideCreateTaskModal } = useTaskStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!taskData.title.trim() || !taskData.description.trim()) {
      console.log('enter valid title and description');
      return;
    }
    e.preventDefault();
    createTask(taskData, {
      onSuccess: (data) => {
        console.log('Task successfully created');
        setTaskData({ ...taskData, title: '', description: '' });
        setTimeout(hideCreateTaskModal, 2000);
      },
      isError: (error) => {
        console.log('Error creating project:', error);
      },
    });
  };

  const createTaskModalVisibility = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showCreateTaskModal();
  };
  useEffect(() => {
    // console.log(taskData);
  }, [taskData]);
  return (
    <article className='sub-task-modal'>
      <div className='grid gap-y-1 p-y-2 p-x-1'>
        <p>Add New Task</p>

        <form onSubmit={handleSubmit}>
          <div className='grid gap-y-1'>
            <input
              type='text'
              style={{ width: '100%', padding: '.4rem' }}
              name='title'
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              placeholder='title'
              disabled={isCreating}
            />
            <textarea
              style={{ width: '100%', padding: '.4rem' }}
              name='description'
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              placeholder='description'
              disabled={isCreating}
            />
            <button type='submit' className='p-x-1 p-y-05 rounded-sm'>
              {isCreating ? 'Creating' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default CreateTaskModal;
