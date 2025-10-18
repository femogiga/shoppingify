import React from 'react'
import { EllipsisVertical } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';


const Header = () => {
  const { mode } = useDarkMode()

  return (
    <header className={`${ mode === 'light' ? 'lightmode' : 'darkmode'} header`}>
      <h2 className={mode === 'light' ? 'font-black' : 'font-white'}>
        Platform Launch
      </h2>
      <div className='flex gap-x-2 item-center'>
        <button>
          <span>+ </span> Add New Task
        </button>
        <EllipsisVertical className='color-dark-white' />
      </div>
    </header>
  );
}

export default Header
