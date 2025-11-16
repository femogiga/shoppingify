import  { useEffect } from 'react';
import ColumnContainer from './ColumnContainer';
import Card from './Card';
import {  useParams, type Params } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useFetchProjectById, useFetchProjects } from '../apis/projectData';
import NewColumnButton from './NewColumnButton';
import { colorGenerator } from '../utils/colorGenerator';
import type { ProjectColumn } from '../types/apiTypes';

const Content = () => {
  const { mode } = useDarkMode();
  const params: Readonly<Params<string>> = useParams();
  const id = parseInt(params.id || '1', 10) || 1;


  const { data: projectData } = useFetchProjects();
  const { projectById } = useFetchProjectById(id);

  useEffect(() => {}, [id, params, projectData]);

  console.log('project', projectById);

  console.log('==========>', projectById);

  return (
    <section
      className={`${mode === 'light' ? 'bg-white' : 'bg-darker'} content`}
      style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      {projectById?.projectColumn.map(
        (column: ProjectColumn, index: number) => (
          <ColumnContainer
            key={column.name}
            heading={column.name}
            taskCount={column?.tasks.length}
            statusColor={colorGenerator(index)}>
            {column.tasks.map((task) => (
              <div key={`todo-${task.id}`}>
                <Card {...task} projectColumns={projectById.projectColumn} />
              </div>
            ))}
          </ColumnContainer>
        )
      )}

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
