import React, { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import useTaskStore from '../statemanagment/taskStore';
import { Link } from 'react-router-dom';
import DeleteEditModal from './DeleteEditModal';
import useModalStore from '../statemanagment/modalStore';

const Header = () => {
  const { mode } = useDarkMode();
  const { showCreateTaskModal } = useTaskStore();
  const {
    showDeleteProjectModal,
    hideDeleteProjectModal,
    editProjectModal,
    showEditProjectModal,
    hideEditProjectModal
  } = useModalStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const createTaskModalVisibility = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showCreateTaskModal();
  };

  const handleShowDeleteProjectModal = (e) => {
    e.preventDefault();
    setIsOpen(false); // closes deleteEditModal
    showDeleteProjectModal(); //open the delete confimation modal
  };


  const handleShowEditProjectModal = (e) => {
    e.preventDefault();
    setIsOpen(false); // closes deleteEditModal
    showEditProjectModal()
  }
  return (
    <header className={`${mode === 'light' ? 'lightmode' : 'darkmode'} header`}>
      <h2 className={mode === 'light' ? 'font-black' : 'font-white'}>
        Platform Launch
      </h2>
      <div className='relative'>
        <div className='flex gap-x-2 item-center '>
          <button onClick={createTaskModalVisibility}>
            <span>+ </span> Add New Task
          </button>
          <Link to='' onClick={handleIsOpen}>
            <EllipsisVertical className='color-dark-white' />
          </Link>
          {isOpen && (
            <DeleteEditModal
              headerText={'Board'}
              setIsOpen={setIsOpen}
              onOpenDelete={handleShowDeleteProjectModal}
              onOpenEdit={handleShowEditProjectModal}
              modalStyle={{ right: '2rem', width: '10rem', top: '3rem' }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
