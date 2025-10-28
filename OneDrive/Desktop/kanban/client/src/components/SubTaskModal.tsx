import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useTaskStore from '../statemanagment/taskStore';
import { EllipsisVertical } from 'lucide-react';
import SubstackCheckbox from './SubstackCheckbox';
import { useGetTaskById, useUpdateTask } from '../apis/taskData';
import { useParams } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

const SubTaskModal = () => {
  const { activeTaskId, activeTaskData } = useTaskStore();
  const { taskUpdateMutate, isSuccess, isError, isPending } = useUpdateTask(
    activeTaskData.id
  );
  const [status, setStatus] = useState(activeTaskData?.status);
  const { id } = useParams();
  const { mode } = useDarkMode();
   const [count, setCount] = useState(0);
  const queryClient = useQueryClient();
  const { taskData } = useGetTaskById(activeTaskData?.id);

  console.log(taskData)
  // console.log(count);
  console.log('activeTaskData:', activeTaskData);
  // console.log('columns:', activeTaskData?.projectColumns);
  const reCalcCount = taskData && taskData?.subTasks.filter(task => task.status === 'DONE')
  console.log({reCalcCount});



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

  const completedTask = useMemo(() =>  activeTaskData.subTasks.filter( (subTask) => subTask.status === 'DONE'),[activeTaskData.subTasks])




    // queryClient.invalidateQueries({ queryKey: ['allProjects'] });

    // console.log('completed', completedCount);


  // Call this when you know data has changed


  return (
    <article
      className={`sub-task-modal ${
        mode === 'light' ? 'bg-light' : 'bg-darker'
      }`}>
      <div className='grid gap-y-1 p-y-2 p-x-1'>
        <div className='flex item-center justify-between'>
          <p>
            {activeTaskData?.title ||
              'Lorem ipsum dolor sit amet consectetur adipisicing elit.Recusandaeut'}
          </p>
          <EllipsisVertical className='color-dark-white' size='30' />
        </div>
        <p className='color-dark-white'>{activeTaskData?.description}</p>
        <div>
          <p className='mbe-05'>
            Subtask
            <span>
              ({reCalcCount && reCalcCount.length} of{' '}
              {activeTaskData?.subTasks.length})
            </span>
          </p>
          <form>
            <fieldset style={{ marginBlockEnd: '2rem' }}>
              {activeTaskData?.subTasks?.map((subtask) => (
                <SubstackCheckbox key={`subTask-${subtask.id}`} {...subtask} />
              ))}
            </fieldset>
            <fieldset>
              <select
                value={status}
                onChange={handleTaskStatusChange}
                className='rounded-sm'
                style={{
                  width: '100%',
                  padding: '.4rem',
                  background: '#33415c',
                  color: 'white',
                  border: '1px solid #979dac',
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
        </div>
      </div>
    </article>
  );
};

export default SubTaskModal;
