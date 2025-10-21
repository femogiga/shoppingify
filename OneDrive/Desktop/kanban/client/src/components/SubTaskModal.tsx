import React from 'react';
import useTaskStore from '../statemanagment/taskStore';
import { EllipsisVertical } from 'lucide-react';
import SubstackCheckbox from './SubstackCheckbox';

const SubTaskModal = () => {
  const { activeTaskId, activeTaskData } = useTaskStore();
  console.log('activeTaskData', activeTaskData);
  return (
    <article className='sub-task-modal'>
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
              ({2} of {3})
            </span>
          </p>
          <form action=''>
            <fieldset>
              {activeTaskData?.subTasks?.map((subtask) => (
                <SubstackCheckbox key={`${subtask.id}`} {...subtask} />
              ))}
            </fieldset>
            <fieldset>
              <select
                className='rounded-sm'
                style={{
                  width: '100%',
                  padding: '.4rem',
                  background: '#33415c',
                  color: 'white',
                  border: '1px solid #979dac',
                }}>
                <option value='TODO'>Todo</option>
                <option value='DOING'>Doing</option>
                <option value='DONE'>Done</option>
              </select>
            </fieldset>
          </form>
        </div>
      </div>
    </article>
  );
};

export default SubTaskModal;
