import React, { useEffect, useState } from 'react';
import {
  useCreateProject,
  useFetchProjectById,
  useUpdateProjectAndColumn,
} from '../apis/projectData';
import { useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import useModalStore from '../statemanagment/modalStore';
import { useDarkMode } from '../context/DarkModeContext';
import { AnimatePresence, motion } from 'motion/react';

const EditProjectModal = () => {
  const id = useParams()?.id;
  const { mode } = useDarkMode();
  const { projectById } = useFetchProjectById(id);
  const activeColumns = projectById?.projectColumn || []; // Add fallback
  const activeTitle = projectById?.title;
  const [title, setTitle] = useState(activeTitle || ''); // Fixed: Use || instead of ??
  const [columns, setColumns] = useState([]);
  // const { createProject, isCreating, isSuccess, isError, error } =
  //   useCreateProject();
  const { showEditProjectModal, hideEditProjectModal } = useModalStore();

  const { updateProjectMutation, isUpdating, isError, isSuccess, error } =
    useUpdateProjectAndColumn(id);
  useEffect(() => {
    setColumns(activeColumns);
    setTitle(activeTitle || '');
  }, [id, activeColumns, activeTitle]); // Removed title from dependencies

  console.log(columns);

  const handleColumnChange = (index: number, value: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = {
      ...updatedColumns[index],
      name: value,
    };
    setColumns(updatedColumns);
  };

  const addNewColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setColumns([...columns, { project_id: id, name: '' }]);
  };

  const removeColumn = (index: number) => {
    if (columns.length > 1) {
      const updatedColumns = columns.filter((_, i) => i !== index);
      setColumns(updatedColumns);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a project title');
      return;
    }

    // FIXED: Filter out empty columns properly
    const columnData = columns
      .filter((column) => column.name?.trim() !== '') // Access column.name
      .map((column) => ({
        id: column.id,
        name: column.name.trim(),
      }));

    const projectData = {
      id: parseInt(id),
      title: title.trim(),
      projectColumns: columnData,
    };
    //console.log(projectData)
    //return
    updateProjectMutation(projectData, {
      onSuccess: (data) => {
        console.log('Project created', data);
        setTitle('');
        hideEditProjectModal();
        // setColumns([]);
      },
      onError: (error) => {
        console.log('Error creating project:', error);
      },
    });
  };

  return (
    <AnimatePresence>
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`sub-task-modal ${
          mode === 'light' ? 'bg-white font-black' : 'bg-dark'
        }`}>
        <div className='grid gap-y-1 p-y-2 p-x-1'>
          <p>Edit Board</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='title' className='block mbe-05'>
              Board Name
            </label>
            <input
              type='text'
              style={{
                width: '100%',
                padding: '.4rem',
                marginBlockEnd: '1rem',
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter project title'
              disabled={isUpdating}
              className={
                mode === 'light' ? 'bg-blue-sm' : 'bg-darker font-white'
              }
            />

            <div>
              <label className='block mbe-1'>Board Columns</label>
              <div className='grid gap-y-05 mbe-1'>
                {columns &&
                  columns.map((column, index) => (
                    <div key={index} className='flex gap-x-2 items-center'>
                      <input
                        type='text'
                        value={column.name || ''} // FIXED: Use column.name
                        onChange={(e) =>
                          handleColumnChange(index, e.target.value)
                        }
                        placeholder={`Column ${index + 1}`}
                        style={{ width: '100%', padding: '.4rem' }}
                        disabled={isUpdating}
                        className={
                          mode === 'light'
                            ? 'bg-blue-sm '
                            : 'bg-darker font-white'
                        }
                      />
                      {columns.length > 1 && (
                        <button
                          style={{ width: '2rem' }}
                          className={
                            mode === 'light'
                              ? 'bg-blue-sm font-dark-white'
                              : 'bg-darker font-white'
                          }
                          type='button'
                          onClick={() => removeColumn(index)}
                          disabled={isUpdating}>
                          <X />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
              <button
                type='button'
                className={`font-white mbe-1
                  ${mode === 'light' ? 'bg-light-blue  ' : 'bg-darker '}`}
                onClick={addNewColumn}
                style={{
                  width: '100%',
                  paddingBlock: '.6rem',
                  marginBlockEnd: '1rem',
                }}
                disabled={isUpdating}>
                <span>+ </span> Add New Column
              </button>
            </div>

            <button
              type='submit'
              style={{ width: '100%', paddingBlock: '.6rem' }}
              disabled={isUpdating || !title.trim()}
              className={`font-white mbe-1
                  ${mode === 'light' ? 'bg-light-blue  ' : 'bg-darker '}`}>
              {isUpdating ? 'Updating...' : 'Update Project'}
            </button>
          </form>
        </div>
      </motion.article>
    </AnimatePresence>
  );
};

export default EditProjectModal;
