import React from 'react'
import { Link } from 'react-router-dom';
import useColumnStore from '../statemanagment/columnStore';

const NewColumnButton = ({ mode }) => {
  const { showColumnModal } = useColumnStore();

 const handleButtonClick = (e:React.FormEvent<HTMLAnchorElement>) => {
   e.preventDefault();
   e.stopPropagation()
   showColumnModal()
  }
  return (
    <Link
      onClick={handleButtonClick}
      to=''
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '80vh',
        backgroundColor: mode === 'light' ? 'lightgray' : 'hsl(235deg 12% 19%)',
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
