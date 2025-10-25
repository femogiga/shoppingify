import React, { useEffect, useState } from 'react';
import { useCreateTask } from '../apis/taskData';
import { useParams } from 'react-router-dom';
import useTaskStore from '../statemanagment/taskStore';
import { useCreateColumn } from '../apis/columnData';

const CreateColumnModal = ({ mode }) => {
  const [name, setName] = useState('');
  const { id } = useParams();
  const { createColumnMutation, reset, isPending, isError, isSuccess } =
    useCreateColumn(id);

  const handleCreateColumn = (e) => {
    e.preventDefault();
    const data = { project_id: id, name };
    createColumnMutation(data, {
      onSuccess: () => {
        console.log('column successfully created');
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <article className='sub-task-modal'>
      <div className='grid gap-y-1 p-y-2 p-x-1'>
        <p>Add New Column</p>

        <form >
          <div className='grid gap-y-1'>
            <input
              type='text'
              style={{ width: '100%', padding: '.4rem' }}
              name='name'
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              className='p-x-1 p-y-05 rounded-sm'
              onClick={handleCreateColumn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default CreateColumnModal;
