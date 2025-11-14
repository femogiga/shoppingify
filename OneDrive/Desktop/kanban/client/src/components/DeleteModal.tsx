import React, { useEffect, useState } from 'react';
import { useCreateTask, useDeleteTaskMutation } from '../apis/taskData';
import { useParams } from 'react-router-dom';
import useTaskStore from '../statemanagment/taskStore';
import { X } from 'lucide-react';
import useModalStore from '../statemanagment/modalStore';
import { useDarkMode } from '../context/DarkModeContext';

const DeleteModal = ({ headerText, title, onDelete }) => {
  const { hideDeleteModal } = useModalStore();
  const { activeTaskData } = useTaskStore();
  const { deleteMutation } = useDeleteTaskMutation();
  const { mode } = useDarkMode();

  const handleCancel = (e) => {
    e.preventDefault();
    hideDeleteModal();
  };

  const handleDeleteTask = (e) => {
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
    <article
      className={`sub-task-modal ${
        mode === 'light' ? 'bg-white font-black' : 'bg-dark'
      }`}>
      <div className='grid gap-y-1 p-y-2 p-x-1'>
        <form>
          <p>
            Delete this <span>{headerText}</span> ?
          </p>

          <p className='mbe-1'>
            Are you sure you want to delete "<span style={{color:'red'}}>{activeTaskData.title}</span>" task and it's
            subtasks? This action cannot be reversed
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
    </article>
  );
};

export default DeleteModal;
