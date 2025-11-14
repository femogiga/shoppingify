import { Check, Plus, User, X } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useRemoveUserFromTaskMutation } from '../apis/userData';

const Avatar = ({ src,id ,taskId}) => {
  const [operations, setOperations] = useState(false);
const { removeUserToTaskMutation } = useRemoveUserFromTaskMutation(taskId);
  const handleAvatarClick = (e) => {
    e.preventDefault();


      setOperations((prev) => !prev);
    }

  const handleRemoveUserFromTask = (e) => {
    // ✅ Move this INSIDE the function to use the newStatus
    e.preventDefault()
    removeUserToTaskMutation(id, {
      onSuccess: () => {
        console.log('Successfully deleted');
         setOperations((prev) => !prev);

      },
      onError: (error) => {
        console.error('Update failed:', error);
        // Optionally revert status on error
      },
    });
  };
  return (
    <div className='relative'>
      {operations && (
        <div
          className='absolute flex items-center'
          style={{ top: '-1.2rem', columnGap: '.5rem', left: '-.4rem' }}>
          <button onClick={handleRemoveUserFromTask}>
            <X size={18} />
          </button>
          <Check size={18} />
        </div>
      )}
      <Link onClick={handleAvatarClick}>
        <img
          style={{
            width: '2rem',
            aspectRatio: 1,
            borderRadius: '50%',
            objectFit: 'cover',
            overflowClipMargin: 'unset',
          }}
          src={
            src ||
            'https://images.pexels.com/photos/34123077/pexels-photo-34123077.jpeg'
          }
        />
      </Link>
    </div>
  );
}

export default Avatar
