import React, { useEffect, useState } from 'react';
import { useCreateTask, useDeleteTaskMutation } from '../apis/taskData';
import { useParams } from 'react-router-dom';
import useTaskStore from '../statemanagment/taskStore';
import { X } from 'lucide-react';
import useModalStore from '../statemanagment/modalStore';
import { useCreateUserMutation } from '../apis/userData';

const CreateUserModal = () => {
  const { hideCreateUserModal, showCreateUserModal } = useModalStore();
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    repeatpassword: '',
    photoUrl: '',
  };
  const [user, setUser] = useState(initialState);
  const [message, setMessage] = useState('');
  const { createUserMutation, isSuccess, isCreating, isPending, error, reset } =
    useCreateUserMutation();

  const handleInputChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(user);

  const handleCreateNewUser = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user.password !== user.repeatpassword) {
      setMessage('password  does not match');
      return;
    }
    const userData = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      photoUrl: user.photoUrl,
    };

    createUserMutation(userData, {
      onSuccess: () => {
        console.log('user successfully created');
        setUser(initialState);
        hideCreateUserModal();
      },
      onError: (error) => console.error(error),
    });
  };

  const handleCancel = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    hideCreateUserModal();
  };
  return (
    <article className='sub-task-modal' style={{ zIndex: '10' }}>
      <div className='grid gap-y-1 p-y-2 p-x-2'>
        <form>
          <p className='mbe-1'>Add user board</p>
          <fieldset className='grid mbe-1' style={{ rowGap: '0.5rem' }}>
            <input
              type='email'
              placeholder='Email'
              style={{ display: 'block', width: '100%' }}
              className='p-y-05'
              value={user.email}
              name='email'
              onChange={handleInputChange}
            />
            <input
              type='text'
              placeholder='Firstname'
              style={{ display: 'block', width: '100%' }}
              className='p-y-05'
              value={user.firstname}
              name='firstname'
              onChange={handleInputChange}
            />
            <input
              type='text'
              placeholder='Lastname'
              style={{ display: 'block', width: '100%' }}
              className='p-y-05'
              value={user.lastname}
              name='lastname'
              onChange={handleInputChange}
            />
            <input
              type='password'
              placeholder='Password'
              style={{ display: 'block', width: '100%' }}
              className='p-y-05'
              value={user.password}
              name='password'
              onChange={handleInputChange}
            />
            <input
              type='password'
              placeholder='Repeat password'
              style={{ display: 'block', width: '100%' }}
              className='p-y-05'
              value={user.repeatpassword}
              name='repeatpassword'
              onChange={handleInputChange}
            />

            <input
              type='text'
              placeholder='photoUrl'
              style={{ display: 'block', width: '100%' }}
              className='p-y-05'
              value={user.photoUrl}
              name='photoUrl'
              onChange={handleInputChange}
            />
          </fieldset>
          <div className='flex justify-between'>
            <button
              type='button'
              onClick={handleCreateNewUser}
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

export default CreateUserModal;
