import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const DeleteEditModal = ({ isOpen, onClose, children, modalStyle, onOpen }) => {
  return (
    <div
      className='delete-edit-modal absolute font-white grid'
      style={modalStyle}>
      <Link>Edit Board</Link>
      <Link>Delete Board</Link>
    </div>
  );
};

export default DeleteEditModal;
