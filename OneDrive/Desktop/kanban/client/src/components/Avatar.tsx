import { User } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const Avatar = () => {
  return (
    <Link onClick={''}>

        <img
          style={{
            width: '2rem',
            aspectRatio: 1,
            borderRadius: '50%',
            objectFit: 'cover',
            overflowClipMargin: 'unset',
          }}
          src={

            'https://images.pexels.com/photos/34123077/pexels-photo-34123077.jpeg'
          }
        />

    </Link>
  );
}

export default Avatar
