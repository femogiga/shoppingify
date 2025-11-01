import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useTaskStore from '../statemanagment/taskStore';
import useModalStore from '../statemanagment/modalStore';

const DeleteEditModal = ({
  isOpen,
  setIsOpen,
  children,
  modalStyle,
  onOpen,
  headerText,
  onOpenEdit,
  onOpenDelete
}) => {
  const {
    showEditTaskModal,
    hideEditTaskModal,

    modalVisible,
    hideModal,
    showModal,
  } = useTaskStore();
  const { showDeleteModal, hideDeleteModal } = useModalStore();
  const handleShowEditModal = (e) => {
    e.preventDefault();
    showEditTaskModal();
    hideDeleteModal();
    hideModal();
    setIsOpen(false);
  };

  const handleShowDeleteModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    showDeleteModal();
    setIsOpen(false);
    hideEditTaskModal();

    hideModal();
  };

  return (
    <div
      className='delete-edit-modal absolute font-white grid'
      style={modalStyle}>
      <Link onClick={onOpenEdit}>
        Edit <span>{headerText}</span>
      </Link>
      <Link onClick={onOpenDelete}>
        Delete <span>{headerText}</span>
      </Link>
    </div>
  );
};

export default DeleteEditModal;
