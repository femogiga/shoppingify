import React, { useEffect, useState } from 'react';
import { useCreateProject, useFetchProjectById } from '../apis/projectData';
import { useParams } from 'react-router-dom';

const EditProjectModal = () => {
   const id  = useParams()?.id;
  const { projectById } = useFetchProjectById(id);
  const activeColumns = projectById?.projectColumn;
  const [title, setTitle] = useState('');
  const [columns, setColumns] = useState([]);
  const { createProject, isCreating, isSuccess, isError, error } =
    useCreateProject();

  useEffect(() => {
    setColumns(activeColumns);
  }, [ id, activeColumns]);
    console.log(columns);

  const handleColumnChange = (index: number, value: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index].name = value;
    setColumns(updatedColumns);
  };

  const addNewColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setColumns([...columns, {project_id:id,name:''}]);
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
//
    // Filter out empty columns and create column objects
    const columnData = columns
      .filter((column) => column.trim() !== '')
      .map((columnName) => ({ name: columnName.trim() }));

    const projectData = {
      title: title.trim(),

      projectColumns: columnData, // Send columns as array of objects with name
    };

    createProject(projectData, {
      onSuccess: (data) => {
        console.log('Project created', data);
        setTitle('');
        setColumns(['']);
      },
      onError: (error) => {
        console.log('Error creating project:', error);
      },
    });
  };

  return (
    <article className='sub-task-modal'>
      <div className='grid gap-y-1 p-y-2 p-x-1'>
        <p>Edit Board</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Board Name</label>
          <input
            type='text'
            style={{ width: '100%', padding: '.4rem' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter project title'
            disabled={isCreating}
          />

          <div>
            <label>Board Columns</label>
            <div className='grid gap-y-05'>
              {columns && columns.map((column, index) => (
                <div key={index} className='flex gap-x-2 items-center'>
                  <input
                    type='text'
                    value={column.name}
                    onChange={(e) => handleColumnChange(index, e.target.value)}
                    placeholder={`Column ${index + 1}`}
                    style={{ width: '100%', padding: '.4rem' }}
                    disabled={isCreating}
                  />
                  {columns.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeColumn(index)}
                      disabled={isCreating}>
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type='button'
              onClick={addNewColumn}
              style={{ width: '100%', paddingBlock: '.6rem' }}
              disabled={isCreating}>
              <span>+ </span> Add New Column
            </button>
          </div>

          <button type='submit' disabled={isCreating || !title.trim()}>
            {isCreating ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </div>
    </article>
  );
};

export default EditProjectModal;
