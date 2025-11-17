import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useModalStore from '../statemanagment/modalStore';
import {
  useDeleteProjectMutation,
  useFetchProjectById,
} from '../apis/projectData';
import { AnimatePresence, motion } from 'motion/react';
import { useDarkMode } from '../context/DarkModeContext';

interface IDeleteProjectModal {
  headerText:string;
  title:string;
  onDelete : ()=> void;
}


const DeleteProjectModal:React.FC<IDeleteProjectModal> = ({ headerText }) => {
  const{mode} = useDarkMode()
  const { hideDeleteModal, hideDeleteProjectModal } =
    useModalStore();
  const { deleteProjectMutation } = useDeleteProjectMutation();
  const id = useParams().id;
  if (!id) {
    return
  }
  const navigate = useNavigate()
  console.log(id);
  const { projectById } = useFetchProjectById(parseInt(id));
  const handleCancel = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    hideDeleteModal();
    hideDeleteProjectModal();
  };
  // console.log({ projectById });
  const handleDeleteProject = (e:React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteProjectMutation(id, {
      onSuccess: () => {
        console.log('successfully deleted');
        hideDeleteProjectModal();
        navigate('/projects')
      },
      onError: () => console.log('An error has occurred'),
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
          <form>
            <p className='bold'>
              Delete this <span>{headerText}</span> ?
            </p>

            <p className='mbe-1'>
              Are you sure you want to delete project "
              <span style={{ color: 'red' }}>
                {projectById && projectById?.title}
              </span>
              " associated tasks and it's subtasks? This action cannot be
              reversed
            </p>

            <div className='flex justify-between '>
              <button
                type='button'
                onClick={handleDeleteProject}
                className='p-y-05 p-x-05'
                style={{
                  width: '46%',
                  borderRadius: '1rem',
                  backgroundColor: 'hsl(0deg 78% 63%)',
                  border: 'none',
                  outline: 'none',
                  color: '#ffff',
                }}>
                Delete
              </button>
              <button
                type='button'
                onClick={handleCancel}
                className='p-y-05 p-x-05'
                style={{
                  width: '46%',
                  borderRadius: '1rem',
                  border: 'none',
                  outline: 'none',
                }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.article>
    </AnimatePresence>
  );
};

export default DeleteProjectModal;
