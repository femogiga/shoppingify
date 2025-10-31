import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useTaskStore from '../statemanagment/taskStore';

const DeleteEditModal = ({
  isOpen,
  setIsOpen,
  children,
  modalStyle,
  onOpen,
}) => {
  const { showEditTaskModal, hideEditTaskModal } = useTaskStore();
  const handleShowEditModal = (e) => {
    e.preventDefault();
    showEditTaskModal();
    setIsOpen(false);
  };
  return (
    <div
      className='delete-edit-modal absolute font-white grid'
      style={modalStyle}>
      <Link onClick={handleShowEditModal}>Edit Board</Link>
      <Link>Delete Board</Link>
    </div>
  );
};

export default DeleteEditModal;
