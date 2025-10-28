import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useMemo } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import useTaskStore from '../statemanagment/taskStore';

const Card = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });
  const { mode } = useDarkMode()
  // console.log('props' ,props)
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const {
    activeTaskId,
    modalVisible,
    setActiveTaskId,
    showModal,
    hideModal,
    setActiveTaskData,
  } = useTaskStore();

  const handleTaskClick = (e, taskId,props) => {
    e.preventDefault();
    setActiveTaskId(taskId);
     setActiveTaskData(props);
    showModal();
    return
  };
  // console.log("=====>",props.projectColumns)
  // console.log('activeTaskId',activeTaskId);

  console.log(props)
  const totalTask = props.subTasks.length;
  const completedTask = useMemo(
    () => props.subTasks.filter((subTask) => subTask.status === 'DONE'),
    [props.subTasks]
  );
  console.log({ totalTask })
  console.log(completedTask.length)
  return (
    <article
      className={`${mode === 'light' ? 'lightmode' : 'bg-dark'} card`}
      style={style}
      onDoubleClick={(e)=>handleTaskClick(e,props.id,props)}
      ref={setNodeRef}
      {...attributes}
      {...listeners}>
      <p className={mode === 'light' ? 'font-black' : 'font-white'}>
        {props.title || 'Build UI for onboarding flow'}
      </p>
      <p className='color-dark-white font-sm'>
        <span>{completedTask.length} </span>of<span> {totalTask} </span>subtasks
      </p>
    </article>
  );
};

export default Card;
