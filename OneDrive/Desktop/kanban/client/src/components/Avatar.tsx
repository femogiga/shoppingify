import { Check,  X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRemoveUserFromTaskMutation } from '../apis/userData';
import { useDarkMode } from '../context/DarkModeContext';

interface IAvatar {
  src: string;
  id: number;
  taskId: number;
}
const Avatar: React.FC<IAvatar> = ({ src, id, taskId }) => {
  const [operations, setOperations] = useState(false);
  const { mode } = useDarkMode();
  const { removeUserToTaskMutation } = useRemoveUserFromTaskMutation(taskId);

  const handleAvatarClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOperations((prev) => !prev);
  };

  const handleRemoveUserFromTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    // ✅ Move this INSIDE the function to use the newStatus
    e.preventDefault();
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
            <X size={18} className={mode === 'light' ? '' : ''} />
          </button>
          <Check size={18} />
        </div>
      )}
      <Link to ="#" onClick={handleAvatarClick}>
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
};

export default Avatar;
