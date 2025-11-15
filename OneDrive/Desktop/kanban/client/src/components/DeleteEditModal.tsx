import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useTaskStore from '../statemanagment/taskStore';
import useModalStore from '../statemanagment/modalStore';
import { useDarkMode } from '../context/DarkModeContext';
import { AnimatePresence, motion } from 'motion/react';

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
  const {mode} = useDarkMode()
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
    <AnimatePresence>
      <motion.div
        className={`delete-edit-modal absolute font-white grid ${
          mode === 'light' ? 'bg-white' : 'bg-dark'
        }`}
        style={modalStyle}>
        <Link onClick={onOpenEdit} className='color-dark-white'>
          Edit <span>{headerText}</span>
        </Link>
        <Link onClick={onOpenDelete} className='font-red'>
          Delete <span>{headerText}</span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteEditModal;
