import { DndContext } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react';
import ColumnContainer from './ColumnContainer';
import Card from './Card';
import { Link, useParams } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useFetchProjectById, useFetchProjects } from '../apis/projectData';

const Content = () => {
  const [parent, setParent] = useState(null);
  const { mode } = useDarkMode();
  const params = useParams();
  const id = parseInt(params.id);

  const { data: projectData } = useFetchProjects();
  const activeProject = projectData?.find((project) => project.id === id);

  useEffect(() => {}, [id, params, projectData]);

  console.log('project', activeProject);

  const [tasks, setTasks] = useState({
    TODO: [], // Changed to uppercase to match your API
    DOING: [], // Changed to uppercase to match your API
    DONE: [], // Changed to uppercase to match your API
  });

 const handleDragEnd = (event) => {
   const { active, over } = event;
   if (!over) return;

   const taskId = parseInt(active.id);

   // ✅ FIX: over.id is an object, not a string. Use over.id (the string ID)
   const overId = over.id; // This should be the string ID like 'todo', 'doing', etc.

   console.log('Drag ended:', { taskId, overId, over }); // Debug log

   // Find current column
   let currentColumn = null;
   Object.keys(tasks).forEach((col) => {
     if (tasks[col].includes(taskId)) {
       currentColumn = col;
     }
   });

   if (!currentColumn) return;

   // CASE 1: Moving to different column
   if (['todo', 'doing', 'done'].includes(overId)) {
     if (currentColumn !== overId) {
       setTasks((prev) => ({
         ...prev,
         [currentColumn]: prev[currentColumn].filter((id) => id !== taskId),
         [overId]: [...prev[overId], taskId],
       }));
     }
     return;
   }

   // CASE 2: If overId is still an object, try to get the string ID
   if (typeof overId === 'object') {
     console.warn('overId is an object:', overId);
     return; // Handle this case appropriately
   }

   // CASE 3: Moving between specific positions (only if overId is string)
   if (typeof overId === 'string' && overId.includes('-')) {
     const [column, index] = overId.split('-');
     const targetIndex = parseInt(index);

     if (column === currentColumn) {
       // Reorder within same column
       const currentIndex = tasks[currentColumn].indexOf(taskId);
       if (currentIndex !== -1) {
         setTasks((prev) => ({
           ...prev,
           [currentColumn]: arrayMove(
             prev[currentColumn],
             currentIndex,
             targetIndex
           ),
         }));
       }
     } else {
       // Move to different column at specific position
       setTasks((prev) => {
         const source = prev[currentColumn].filter((id) => id !== taskId);
         const destination = [...prev[column]];
         destination.splice(targetIndex, 0, taskId);

         return {
           ...prev,
           [currentColumn]: source,
           [column]: destination,
         };
       });
     }
   }
  };


  const { projectById } = useFetchProjectById(id)

  // console.log("==========>",projectById)

  return (
    <section
      className={`${mode === 'light' ? 'bg-light' : 'bg-darker'} content`}
      style={{ display: 'flex', gap: '1rem', padding: '1rem' }} // Added flex layout
    >
      {/* <DndContext onDragEnd={handleDragEnd}> */}
        {/* TODO Column */}
        {projectById?.projectColumn.map((column) => (
          <ColumnContainer key={column.name} heading={column.name} id={column.name}>
            {column.tasks.map((task) => (
              <Card
                key={`todo-${task.id}`}
                id={task.id}
                title={task.title}
                {...task}
                projectColumns = {projectById.projectColumn}
              />
            ))}
          </ColumnContainer>
        ))}

      {/* </DndContext> */}

      {/* New Column Button */}
      <div>
        <div className='flex item-center gap-x-05'>
          <div className='circle' style={{ visibility: 'hidden' }}></div>
          <h3 className='font-white padding-block-1 color-dark-white'>
            <span style={{ visibility: 'hidden' }}>({0})</span>{' '}
            {/* Fixed count */}
          </h3>
        </div>
        <Link
          to=''
          style={{
            display: 'grid',
            placeItems: 'center',
            height: '80vh',
            backgroundColor: mode === 'light' ? 'lightgray' : '#33415c',
            color: mode === 'light' ? 'black' : 'white',
            textDecoration: 'none',
            borderRadius: '1rem',
            minWidth: '280px', // Added min-width for consistency
          }}>
          <span>+ New Column</span>
        </Link>
      </div>
    </section>
  );
};

export default Content;
