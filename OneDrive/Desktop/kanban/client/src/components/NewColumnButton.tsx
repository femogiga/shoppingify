import React from 'react';
import { Link } from 'react-router-dom';
import useColumnStore from '../statemanagment/columnStore';
import useModalStore from '../statemanagment/modalStore';

const NewColumnButton = ({ mode }) => {
  const { showColumnModal } = useColumnStore();
  const { showEditProjectModal, hideEditProjectModal } = useModalStore();

  const handleButtonClick = (e: React.FormEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    showEditProjectModal();
  };
  return (
    <Link
      onClick={handleButtonClick}
      className={mode === 'light' ? 'bg-blue-sm' : 'bg-dark'}
      to=''
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '80vh',

        color: mode === 'light' ? 'black' : 'white',
        textDecoration: 'none',
        borderRadius: '1rem',
        minWidth: '280px', // Added min-width for consistency
      }}>
      <span style={{ fontSize: '1.6rem' }} className='color-dark-white'>
        + New Column
      </span>
    </Link>
  );
};

export default NewColumnButton;
