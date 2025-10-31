import React, { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import useTaskStore from '../statemanagment/taskStore';
import { Link } from 'react-router-dom';
import DeleteEditModal from './DeleteEditModal';

const Header = () => {
  const { mode } = useDarkMode();
  const { showCreateTaskModal } =
    useTaskStore();
  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpen = (e) => {
    e.preventDefault();
    setIsOpen(true)
  }

  const createTaskModalVisibility = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showCreateTaskModal();
  };
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
          {isOpen && <DeleteEditModal setIsOpen={setIsOpen} modalStyle={{ right: "2rem", width: "10rem", top: '3rem' }} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
