import React, { useEffect, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';
import useTaskStore from '../statemanagment/taskStore';
import { Link } from 'react-router-dom';
import DeleteEditModal from './DeleteEditModal';
import useModalStore from '../statemanagment/modalStore';
import { AuthAvatarButton } from './AuthAvatarButton';
import Avatar from './Avatar';
import { useUserdata } from '../apis/userData';
import { generateFullname } from '../utils/fullname';

const Header = () => {
  const { mode } = useDarkMode();
  const { showCreateTaskModal } = useTaskStore();
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const {
    showDeleteProjectModal,
    hideDeleteProjectModal,
    editProjectModal,
    showEditProjectModal,
    hideEditProjectModal,
    showCreateUserModal,
  } = useModalStore();
  const [isOpen, setIsOpen] = useState(false);
  const { AllUserData, isUsersPending, isUserSError } = useUserdata();
  const [searchedUser, setSearchedUser] = useState('');
  console.log({ AllUserData });
  const handleIsOpen = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  // @Handler  handleShowAuthModal handles the visibility of login ,register @Component AuthAvatarButton
  const handleShowAuthModal = (e) => {
    e.preventDefault();
    setShowAuthModal(!showAuthModal);
  };
  // @Handler createTaskModalVisibility handles the modal for creating task
  const createTaskModalVisibility = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showCreateTaskModal();
  };

  const handleShowDeleteProjectModal = (e) => {
    e.preventDefault();
    setIsOpen(false); // closes deleteEditModal
    showDeleteProjectModal(); //open the delete confimation modal
  };

  const handleShowEditProjectModal = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setIsOpen(false); // closes deleteEditModal
    showEditProjectModal();
  };

  const handleSearchUsers = () => {
    const filteredUser = AllUserData?.filter(
      (user) =>
        generateFullname(user.firstname, user.lastname)
          .toLowerCase()
          .includes(searchedUser.toLowerCase()) ||
        user.firstname.toLowerCase().includes(searchedUser.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchedUser.toLowerCase())
    );

    return filteredUser;
  };

  const handleCreateUserModalVisibility = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    showCreateUserModal()
  }

  useEffect(() => {}, []);
  const searchedOptions = handleSearchUsers();
  console.log(searchedOptions);
  return (
    <header className={`${mode === 'light' ? 'lightmode' : 'darkmode'} header`}>
      <div className='flex items-center gap-x-2'>
        <h2 className={mode === 'light' ? 'font-black' : 'font-white'}>
          Platform Launch
        </h2>
        <AuthAvatarButton
          showAuthModal={showAuthModal}
          onShowAuthModal={handleShowAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      </div>

      <div
        className='avatar-container flex gap-x-1 item-center relative'
        style={{ width: '40%' }}>
        <form>
          <button onClick={handleCreateUserModalVisibility}>Add User</button>
          {searchedUser && (
            <article
              className='grid gap-y-05 absolute bg-darker p-y-05'
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                width: '12rem',
                backgroundColor: '',
                top: '3rem',
              }}>
              {searchedOptions &&
                searchedOptions.map((user) => (
                  <div>
                    <div
                      className='flex gap-x-05  item-center justify-between p-x-05 '
                      style={{ color: 'white' }}>
                      <p>{generateFullname(user.firstname, user.lastname)}</p>
                      <img
                        src={user.photoUrl}
                        style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          zIndex: 10,
                          overflowClipMargin: 'unset',
                        }}
                      />
                    </div>
                  </div>
                ))}
            </article>
          )}
        </form>
        <div className='flex item-center gap-x-05'>
          {/* <Avatar />
          <Avatar />
          <Avatar /> */}
        </div>
      </div>

      <div className='relative'>
        <div className='flex gap-x-2 item-center '>
          <button onClick={createTaskModalVisibility}>
            <span>+ </span> Add New Task
          </button>
          <Link to='' onClick={handleIsOpen}>
            <EllipsisVertical className='color-dark-white' />
          </Link>
          {isOpen && (
            <DeleteEditModal
              headerText={'Board'}
              setIsOpen={setIsOpen}
              onOpenDelete={handleShowDeleteProjectModal}
              onOpenEdit={handleShowEditProjectModal}
              modalStyle={{ right: '2rem', width: '10rem', top: '3rem' }}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
