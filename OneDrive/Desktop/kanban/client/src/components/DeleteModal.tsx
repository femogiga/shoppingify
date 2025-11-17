import React from 'react';
import { useDeleteTaskMutation } from '../apis/taskData';
import useTaskStore from '../statemanagment/taskStore';
import useModalStore from '../statemanagment/modalStore';
import { useDarkMode } from '../context/DarkModeContext';
import { AnimatePresence, motion } from 'motion/react';

interface IDeleteModal {
  headerText: string;
  title: string;
  onDelete: () => void;
}
const DeleteModal: React.FC<IDeleteModal> = ({ headerText }) => {
  const { hideDeleteModal } = useModalStore();
  const { activeTaskData } = useTaskStore();
  const { deleteMutation } = useDeleteTaskMutation();
  const { mode } = useDarkMode();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    hideDeleteModal();
  };

  const handleDeleteTask = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteMutation(activeTaskData.id, {
      onSuccess: () => {
        console.log('successfully deleted');
        hideDeleteModal();
      },
      onError: () => console.log('An error has occurred'),
    });
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
          <form>
            <p>
              Delete this <span>{headerText}</span> ?
            </p>

            <p className='mbe-1'>
              Are you sure you want to delete "
              <span style={{ color: 'red' }}>{activeTaskData.title}</span>" task
              and it's subtasks? This action cannot be reversed
            </p>

            <div className='flex justify-between '>
              <button
                type='button'
                onClick={handleDeleteTask}
                className='p-y-05 p-x-05'
                style={{
                  width: '46%',
                  borderRadius: '1rem',
                  backgroundColor: 'hsl(0deg 78% 63%)',
                  border: 'none',
                  outline: 'none',
                  color: '#ffff',
                }}>
                Delete
              </button>
              <button
                type='button'
                onClick={handleCancel}
                className='p-y-05 p-x-05'
                style={{
                  width: '46%',
                  borderRadius: '1rem',
                  border: 'none',
                  outline: 'none',
                }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.article>
    </AnimatePresence>
  );
};

export default DeleteModal;
