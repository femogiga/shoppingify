import React from 'react'
import { EllipsisVertical } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import useTaskStore from '../statemanagment/taskStore';


const Header = () => {
  const { mode } = useDarkMode()
    const { showCreateTaskModal } = useTaskStore();

const createTaskModalVisibility = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    showCreateTaskModal()
  }
  return (
    <header className={`${mode === 'light' ? 'lightmode' : 'darkmode'} header`}>
      <h2 className={mode === 'light' ? 'font-black' : 'font-white'}>
        Platform Launch
      </h2>
      <div className='flex gap-x-2 item-center'>
        <button onClick={createTaskModalVisibility}>
          <span>+ </span> Add New Task
        </button>
        <EllipsisVertical className='color-dark-white' />
      </div>
    </header>
  );
}

export default Header
