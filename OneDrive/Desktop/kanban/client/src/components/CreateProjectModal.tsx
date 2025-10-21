import React, { useState } from 'react';
import useTaskStore from '../statemanagment/taskStore';
import { EllipsisVertical } from 'lucide-react';
import SubstackCheckbox from './SubstackCheckbox';
import { useCreateProject } from '../apis/projectData';

const CreateProjectModal = () => {
  const [title, setTitle] = useState('');
  const { createProject, isCreating, isSuccess, isError, error } =
    useCreateProject();

  const handleSubmit = (e) => {
    // ✅ Removed projectData parameter
    e.preventDefault();

    // ✅ Validate input
    if (!title.trim()) {
      alert('Please enter a project title');
      return;
    }

    const projectData = { title: title.trim() }; // ✅ Create data inside function

    createProject(projectData, {
      onSuccess: (data) => {
        console.log('Project created', data);
        setTitle(''); // ✅ Clear form on success
      },
      onError: (error) => {
        console.log('Error creating project:', error);
      },
    });
  };

  return (
    <article className='sub-task-modal'>
      <div className='grid gap-y-1 p-y-2 p-x-1'>
        <p>Add New Board</p>

        <form onSubmit={handleSubmit}>
          {' '}
          {/* ✅ Direct function reference */}
          <input
            type='text'
            style={{ width: '100%', padding: '.4rem' }}
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter project title' // ✅ Added placeholder
            disabled={isCreating} // ✅ Disable during submission
          />
          <button
            type='submit' // ✅ Explicit submit type
            disabled={isCreating || !title.trim()} // ✅ Disable when empty or loading
          >
            {isCreating ? 'Creating...' : 'Create Project'}{' '}
            {/* ✅ Loading state */}
          </button>
          {/* ✅ Show error message */}
          {isError && (
            <div style={{ color: 'red', marginTop: '0.5rem' }}>
              Error: {error?.message || 'Failed to create project'}
            </div>
          )}
          {/* ✅ Show success message */}
          {isSuccess && (
            <div style={{ color: 'green', marginTop: '0.5rem' }}>
              Project created successfully!
            </div>
          )}
        </form>
      </div>
    </article>
  );
};

export default CreateProjectModal;
