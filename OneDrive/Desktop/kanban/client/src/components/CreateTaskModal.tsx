import React, { useEffect, useState } from 'react';
import { useCreateTask } from '../apis/taskData';
import { useParams } from 'react-router-dom';
import useTaskStore from '../statemanagment/taskStore';
import { X } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const CreateTaskModal = () => {
  const { id } = useParams();
  const [subTasks, setSubTasks] = useState<string[]>(['']);
  const { mode } = useDarkMode();
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
    const subTasksData = subTasks
      .filter((subTask) => subTask.trim() !== '')
      .map((objectTitle) => ({ title: objectTitle.trim() }));
    e.preventDefault();
    const dataToSend = { ...taskData, subTasks: subTasksData };
    createTask(dataToSend, {
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

  const handleSubtaskInputChange = (index: number, value: string) => {
    const updatedSubtasks = [...subTasks];
    updatedSubtasks[index] = value;
    setSubTasks(updatedSubtasks);
  };

  const handNewSubTaskInput = (e) => {
    e.preventDefault();
    setSubTasks([...subTasks, '']);
  };
  const handleCancelInput = (index) => {
    const filtered = subTasks.filter((_, i) => i !== index);
    setSubTasks(filtered);
  };
  return (
    <article
      className={`sub-task-modal ${
        mode === 'light' ? 'bg-white font-black' : 'bg-dark'
      }`}>
      <div className='grid gap-y-1 p-y-2 p-x-1'>
        <p>Add New Task</p>

        <form onSubmit={handleSubmit}>
          <div className='grid gap-y-1'>
            <div>
              <label htmlFor='title'>Title</label>
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
                className={mode === 'light' ? 'bg-blue-sm' : 'bg-darker '}
              />
            </div>
            <div>
              <label htmlFor='description'>Description</label>

              <textarea
                style={{ width: '100%', padding: '.4rem' }}
                name='description'
                value={taskData.description}
                onChange={(e) =>
                  setTaskData({ ...taskData, description: e.target.value })
                }
                placeholder='description'
                className={mode === 'light' ? 'bg-blue-sm' : 'bg-darker '}
                disabled={isCreating}
              />
            </div>
            <div>
              <label>Subtasks</label>
              <div className='grid gap-y-05 mbe-1'>
                {subTasks.map((subTask, index) => (
                  <div className='flex gap-x-05'>
                    <input
                      type='text'
                      className={
                        mode === 'light' ? 'bg-blue-sm' : 'bg-dark font-grey'
                      }
                      style={{ width: '100%', padding: '.4rem' }}
                      name='title'
                      value={subTask}
                      onChange={(e) =>
                        handleSubtaskInputChange(index, e.target.value)
                      }
                      placeholder='title'
                      disabled={isCreating}
                      key={`subtaskInput${index}`}
                    />

                    <button
                      type='button'
                      className={`font-white
                  ${mode === 'light' ? 'bg-light-blue  ' : 'bg-darker '}`}
                      onClick={() => handleCancelInput(index)}>
                      <X />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type='button'
                className={`font-white
                  ${mode === 'light' ? 'bg-light-blue  ' : 'bg-darker '}`}
                onClick={handNewSubTaskInput}
                style={{ width: '100%', paddingBlock: '.6rem' }}>
                <span>+ </span> Add New SubTask
              </button>
            </div>
            <button
              type='submit'
              className={`p-x-1 p-y-05 rounded-sm font-white  ${
                mode === 'light' ? 'bg-light-blue' : 'bg-darker font-white'
              }`}>
              {isCreating ? 'Creating' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default CreateTaskModal;
