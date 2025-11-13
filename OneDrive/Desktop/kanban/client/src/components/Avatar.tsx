import { Check, Plus, User, X } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Avatar = ({ src }) => {
  const [operations, setOperations] = useState(false);

  const handleAvatarClick = (e) => {
    e.preventDefault();


      setOperations((prev) => !prev);
    }
  
  return (
    <div className='relative'>
      {operations && (
        <div
          className='absolute flex items-center'
          style={{ top: '-1.2rem', columnGap: '.5rem', left: '-.4rem' }}>
          <X size={18} />
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
