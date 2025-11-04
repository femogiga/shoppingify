import { DndContext } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react';
import ColumnContainer from './ColumnContainer';
import Card from './Card';
import { Link, useParams } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useFetchProjectById, useFetchProjects } from '../apis/projectData';
import NewColumnButton from './NewColumnButton';
import CreateColumnModal from './CreateColumnModal';
import { colorGenerator } from '../utils/colorGenerator';

const BlankContent = () => {
  const [parent, setParent] = useState(null);
  const { mode } = useDarkMode();

  return (
    <section
      className={`${mode === 'light' ? 'bg-light' : 'bg-darker'} content`}
      style={{ display: 'flex', gap: '1rem', padding: '1rem' }} // Added flex layout
    >


      <div>
        <div className='flex item-center gap-x-05'>
          <div className='circle' style={{ visibility: 'hidden' }}></div>
          <h3 className='font-white padding-block-1 color-dark-white'>
            <span style={{ visibility: 'hidden' }}>({0})</span>{' '}
            {/* Fixed count */}
          </h3>
        </div>
        <>
          
        </>
      </div>
    </section>
  );
};

export default BlankContent;
