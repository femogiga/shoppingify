import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const DarkMode = () => {
  const { mode, handleModeChange, handleModeChangeOnToggle } = useDarkMode();

  console.log(mode);
  return (
    <article
      className={`dark-mode-toggle flex item-center gap-x-1 font-white justify-center ${
        mode === 'light' ? 'bg-light-blue' : 'bg-darker'
      }`}>
      <label htmlFor='dark' className='grid '>
        <Sun size={20} color={'#979dac'} />
      </label>
      <input
        type='radio'
        name='darkmode'
        id='dark'
        className='hidden'
        onChange={handleModeChange}
      />
      <input
        type='radio'
        name='darkmode'
        id='light'
        className='hidden'
        onChange={handleModeChange}
      />
      <div className='toggle' onClick={handleModeChangeOnToggle}>
        <div className={`circle ${mode}`}></div>
      </div>
      <label htmlFor='light' className='grid'>
        <Moon size={20} color={'#979dac'} />
      </label>
    </article>
  );
};

export default DarkMode;
