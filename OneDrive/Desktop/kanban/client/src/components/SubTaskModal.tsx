import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useTaskStore from '../statemanagment/taskStore';
import { EllipsisVertical } from 'lucide-react';
import SubstackCheckbox from './SubstackCheckbox';
import { useGetTaskById, useUpdateTask } from '../apis/taskData';
import { Link, useParams } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import DeleteEditModal from './DeleteEditModal';
import useModalStore from '../statemanagment/modalStore';
import Avatar from './Avatar';
import { generateFullname } from '../utils/fullname';
import { useAddUserToTaskMutation, useUserdata } from '../apis/userData';
import { AnimatePresence ,motion} from 'motion/react';
const SubTaskModal = () => {
  const { activeTaskId, activeTaskData, showEditTaskModal, hideEditTaskModal } =
    useTaskStore();
  const { taskUpdateMutate, isSuccess, isError, isPending } = useUpdateTask(
    activeTaskData.id
  );
  const [isOpen, setIsOpen] = useState(false);
  const [addedUser, setAddedUser] = useState(null);

  const handleShowEditModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };
  const [status, setStatus] = useState(activeTaskData?.status);
  const { id } = useParams();
  const { mode } = useDarkMode();
  const [count, setCount] = useState(0);
  const queryClient = useQueryClient();
  const { taskData } = useGetTaskById(activeTaskData?.id);
  const { hideModal } = useTaskStore();
  const { hideDeleteModal, showDeleteModal } = useModalStore();
  const { AllUserData, isUsersPending, isUserSError } = useUserdata();
  const [searchedUser, setSearchedUser] = useState('');
  const { addUserToTaskMutation } = useAddUserToTaskMutation(activeTaskData.id);
  console.log(taskData);
  // console.log(count);
  console.log('activeTaskData:', activeTaskData);
  // console.log('columns:', activeTaskData?.projectColumns);
  const reCalcCount =
    taskData && taskData?.subTasks.filter((task) => task.status === 'DONE');
  // console.log({reCalcCount});

  const handleTaskStatusChange = (e) => {
    e.preventDefault();
    const newStatus = e.target.value;

    // ✅ Move this INSIDE the function to use the newStatus
    const columns = activeTaskData?.projectColumns || [];
    const newTaskColumn = columns.find((column) => column?.name === newStatus); // ✅ Use newStatus

    console.log('newStatus:', newStatus);
    console.log('newTaskColumn:', newTaskColumn);

    if (!newTaskColumn) {
      console.error('No column found for status:', newStatus);
      return;
    }

    const updatedData = {
      id: activeTaskData.id,
      title: activeTaskData.title,
      description: activeTaskData.description,
      status: newStatus,
      projectColumn: { id: newTaskColumn.id },
    };

    console.log('Sending update:', updatedData);

    taskUpdateMutate(updatedData, {
      onSuccess: () => {
        console.log('Successfully updated');
        setStatus(newStatus); // ✅ Update local state after successful mutation
      },
      onError: (error) => {
        console.error('Update failed:', error);
        // Optionally revert status on error
        setStatus(activeTaskData?.status);
      },
    });
  };

  const handleaddUserToTask = (user) => {
    // ✅ Move this INSIDE the function to use the newStatus

    const userData = {
      // taskId: activeTaskData.id,
      id: user?.id,
    };

    addUserToTaskMutation(userData, {
      onSuccess: () => {
        console.log('Successfully added');
        queryClient.invalidateQueries({
          queryKey: ['projectById'],

        });
       setSearchedUser('')
      },
      onError: (error) => {
        console.error('Update failed:', error);
        // Optionally revert status on error
      },
    });
  };

  const completedTask = useMemo(
    () =>
      activeTaskData.subTasks.filter((subTask) => subTask.status === 'DONE'),
    [activeTaskData.subTasks]
  );

  const handleShowEditTaskModal = (e) => {
    e.preventDefault();
    showEditTaskModal();
    hideDeleteModal();
    hideModal();
    setIsOpen(false);
  };

  const handleShowDeleteModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    showDeleteModal();
    setIsOpen(false);
    hideEditTaskModal();

    hideModal();
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

  useEffect(() => {}, []);
  const searchedOptions = handleSearchUsers();
  console.log(searchedOptions);

  // queryClient.invalidateQueries({ queryKey: ['allProjects'] });

  // console.log('completed', completedCount);

  // Call this when you know data has changed

  //      className={`${mode === 'light' ? 'bg-light' : 'bg-darker'} content`}

  return (
    <AnimatePresence>
      <motion.article
        initial={{  opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{  opacity: 0 }}
        className={`sub-task-modal  ${
          mode === 'light' ? 'bg-white' : 'bg-darker'
        }`}>
        <div className='grid gap-y-1 p-y-2 p-x-1'>
          <div className='flex item-center justify-between'>
            <p
              style={{
                color: mode === 'light' ? 'black' : 'white',
                fontWeight: 'bold',
              }}>
              {activeTaskData?.title ||
                'Lorem ipsum dolor sit amet consectetur adipisicing elit.Recusandaeut'}
            </p>
            <Link onClick={handleShowEditModal}>
              <EllipsisVertical className='color-dark-white' size='30' />
            </Link>
          </div>
          <p className='color-dark-white mbe-1'>
            {activeTaskData?.description}
          </p>
          <p className={mode === 'light' ? 'color-dark-white' : 'font-white'}>
            Task Members
          </p>
          <div
            className={`flex item-center gap-x-1  ${
              mode === 'light' ? 'bg-blue-sm' : 'bg-dark '
            }`}
            style={
              {
                // border: '1px solid white',
              }
            }>
            <div
              className='avatar-container grid'
              style={{
                gridAutoFlow: 'column',
                columnGap: '.5rem',
                // width: '14rem',
                height: '5rem',
                alignItems: 'center',
                justifyItems: 'center',
                overflow: 'scroll',
                paddingInline: '.4rem',
              }}>
              {/* <Avatar />
            <Avatar />
            <Avatar />
            <Avatar />

            <Avatar /> */}
              {taskData?.taskMembers.map((user) => (
                <Avatar
                  key={`taskMembers${user.id}`}
                  src={user.photoUrl}
                  {...user}
                  taskId={activeTaskData.id}
                />
              ))}
            </div>
          </div>
          <div
            className='avatar-container  gap-x-1  relative'
            style={{ width: '100%' }}>
            <form>
              <input
                id='users'
                type='text'
                name='user'
                value={searchedUser}
                placeholder='Search and add user '
                className={
                  mode === 'light' ? 'bg-blue-sm' : 'bg-dark color-dark-white'
                }
                autoComplete='off'
                style={{
                  paddingBlock: '.4rem',
                  paddingInline: '.4rem',
                  width: '100%',
                  display: 'block',
                  marginBlockEnd: '1rem',
                  // boxShadow: 'unset',
                  border: 'none',
                }}
                onChange={(e) => setSearchedUser(e.target.value)}
              />
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
                      <div onClick={() => handleaddUserToTask(user)}>
                        <div
                          className='flex gap-x-05  item-center justify-between p-x-05 '
                          style={{ color: 'white' }}>
                          <p>
                            {generateFullname(user.firstname, user.lastname)}
                          </p>
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
          </div>
          <div>
            <p
              className={`mbe-05 ${
                mode === 'light' ? 'color-dark-white' : 'font-white'
              }`}>
              Subtask
              <span>
                ({reCalcCount && reCalcCount.length} of{' '}
                {activeTaskData?.subTasks.length})
              </span>
            </p>
            <form>
              <fieldset style={{ marginBlockEnd: '2rem' }}>
                {activeTaskData?.subTasks?.map((subtask) => (
                  <SubstackCheckbox
                    key={`subTask-${subtask.id}`}
                    {...subtask}
                  />
                ))}
              </fieldset>
              <fieldset>
                <label
                  className={
                    mode === 'light' ? 'color-dark-white' : 'font-white'
                  }>
                  Current Status
                </label>
                <select
                  value={status}
                  onChange={handleTaskStatusChange}
                  className={`rounded-sm ${
                    mode === 'light' ? 'bg-blue-sm' : 'bg-dark'
                  }`}
                  style={{
                    width: '100%',
                    padding: '.4rem',
                    background:
                      mode === 'light'
                        ? 'bg-blue-sm color-dark-white'
                        : 'bg-dark',
                    color:
                      mode === 'light'
                        ? 'hsl(216deg 15% 57%)'
                        : 'hsl(216deg 15% 57%)',
                    // border: '1px solid #979dac',
                  }}
                  disabled={isPending} // ✅ Disable during update
                >
                  {activeTaskData?.projectColumns?.map((col) => (
                    <option key={col.id} value={col.name}>
                      {col.name}
                    </option>
                  ))}
                  {/* <option value='TODO'>Todo</option>
                <option value='DOING'>Doing</option>
                <option value='DONE'>Done</option> */}
                </select>
                {isPending && <div>Updating...</div>}
              </fieldset>
            </form>

            {isOpen && (
              <DeleteEditModal
                onOpenEdit={handleShowEditTaskModal}
                onOpenDelete={handleShowDeleteModal}
                headerText={'Task'}
                setIsOpen={setIsOpen}
                modalStyle={{
                  right: '2rem',
                  width: '10rem',
                  top: '3rem',
                  background: '#fff',
                  color: 'black',
                }}
              />
            )}
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  );
};

export default SubTaskModal;
