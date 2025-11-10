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

const Content = () => {
  const [parent, setParent] = useState(null);
  const { mode } = useDarkMode();
  const params = useParams();
  const id = parseInt(params.id);

  const { data: projectData } = useFetchProjects();
  const { projectById, refetch: refetchProjectById } = useFetchProjectById(id);

  useEffect(() => {}, [id, params, projectData]);

  console.log('project', projectById);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = parseInt(active.id);
    const overId = over.id;

    console.log('Drag ended:', { taskId, overId, over });

    // TODO: Implement your drag and drop logic here
    // You'll need to create a mutation for updating task status/column
  };

  console.log('==========>', projectById);

  return (
    <section
      className={`${mode === 'light' ? 'bg-light' : 'bg-darker'} content`}
      style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      {projectById?.projectColumn.map((column, index) => (
        <ColumnContainer
          key={column.name}
          heading={column.name}
          taskCount={column?.tasks.length}
          statusColor={colorGenerator(index)}
          id={column.name}>
          {column.tasks.map((task) => (
            <div key={`todo-${task.id}`}>
              <Card
                id={task.id}
                title={task.title}
                {...task}
                projectColumns={projectById.projectColumn}
              />
            </div>
          ))}
        </ColumnContainer>
      ))}

      <div>
        <div className='flex item-center gap-x-05'>
          <div className='circle' style={{ visibility: 'hidden' }}></div>
          <h3 className='font-white padding-block-1 color-dark-white'>
            <span style={{ visibility: 'hidden' }}>({0})</span>
          </h3>
        </div>
        <NewColumnButton mode={mode} />
      </div>
    </section>
  );
};

export default Content;
