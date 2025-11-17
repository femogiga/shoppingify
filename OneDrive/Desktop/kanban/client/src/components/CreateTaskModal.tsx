import React, { useEffect, useState } from 'react';
import { useCreateTask } from '../apis/taskData';
import { useParams } from 'react-router-dom';
import useTaskStore from '../statemanagment/taskStore';
import { X } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import { AnimatePresence, motion } from 'motion/react';

const CreateTaskModal = () => {
  const { id } = useParams();
  const [subTasks, setSubTasks] = useState<string[]>(['']);
  const { mode } = useDarkMode();
  if (id === undefined) {
    return
  }
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    project_id: parseInt(id),
    status: 'TODO',
  });
  const { createTask, isCreating } = useCreateTask();
  const {  hideCreateTaskModal } = useTaskStore();

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
      onSuccess: () => {
        console.log('Task successfully created');
        setTaskData({ ...taskData, title: '', description: '' });
        setTimeout(hideCreateTaskModal, 2000);
      },
      onError: (error) => {
        console.log('Error creating project:', error);
      },
    });
  };


  useEffect(() => {
    // console.log(taskData);
  }, [taskData]);

  const handleSubtaskInputChange = (index: number, value: string) => {
    const updatedSubtasks = [...subTasks];
    updatedSubtasks[index] = value;
    setSubTasks(updatedSubtasks);
  };

  const handNewSubTaskInput = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubTasks([...subTasks, '']);
  };
  const handleCancelInput = (index : number) => {
    const filtered = subTasks.filter((_, i) => i !== index);
    setSubTasks(filtered);
  };
  return (
    <AnimatePresence>
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
                  className={
                    mode === 'light' ? 'bg-blue-sm' : 'bg-darker font-white'
                  }
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
                  className={
                    mode === 'light' ? 'bg-blue-sm' : 'bg-darker font-white'
                  }
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
                          mode === 'light'
                            ? 'bg-blue-sm'
                            : 'bg-darker font-white'
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
                disabled={isCreating}
                className={`p-x-1 p-y-05 rounded-sm font-white  ${
                  mode === 'light' ? 'bg-light-blue' : 'bg-darker font-white'
                }`}>
                {isCreating ? 'Creating' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </motion.article>
    </AnimatePresence>
  );
};

export default CreateTaskModal;
