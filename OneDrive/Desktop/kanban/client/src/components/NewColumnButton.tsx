import React from 'react'
import { Link } from 'react-router-dom';

const NewColumnButton = ({mode}) => {
  return (
    <Link
      to=''
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '80vh',
        backgroundColor: mode === 'light' ? 'lightgray' : '#33415c',
        color: mode === 'light' ? 'black' : 'white',
        textDecoration: 'none',
        borderRadius: '1rem',
        minWidth: '280px', // Added min-width for consistency
      }}>
      <span>+ New Column</span>
    </Link>
  );
}

export default NewColumnButton
