import React from 'react';
import { Link } from 'react-router-dom';

import { useDarkMode } from '../context/DarkModeContext';
import { AnimatePresence, motion } from 'motion/react';

interface IDeleteEditModal {
  headerText: string;
  onOpenEdit: () => void;
  onOpenDelete: () => void;
}
const DeleteEditModal: React.FC<IDeleteEditModal> = ({
  headerText,
  onOpenEdit,
  onOpenDelete,
}) => {
  // const {
  //   showEditTaskModal,
  //   hideEditTaskModal,

  //   modalVisible,
  //   hideModal,
  //   showModal,
  // } = useTaskStore();
  // const { showDeleteModal, hideDeleteModal } = useModalStore();
  const { mode } = useDarkMode();
  // const handleShowEditModal = (e) => {
  //   e.preventDefault();
  //   showEditTaskModal();
  //   hideDeleteModal();
  //   hideModal();
  //   setIsOpen(false);
  // };

  // const handleShowDeleteModal = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   showDeleteModal();
  //   setIsOpen(false);
  //   hideEditTaskModal();

  //   hideModal();
  // };

  return (
    <AnimatePresence>
      <motion.div
        className={`delete-edit-modal absolute font-white grid ${
          mode === 'light' ? 'bg-white' : 'bg-dark'
        }`}>
        <Link to='#' onClick={onOpenEdit} className='color-dark-white'>
          Edit <span>{headerText}</span>
        </Link>
        <Link to='#' onClick={onOpenDelete} className='font-red'>
          Delete <span>{headerText}</span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteEditModal;
