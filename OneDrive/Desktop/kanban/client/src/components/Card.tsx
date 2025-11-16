import React, { useMemo } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import useTaskStore from '../statemanagment/taskStore';
import { AnimatePresence, motion } from 'motion/react';
import type { ProjectColumn, SubTask, Task, User } from '../types/apiTypes';

interface CardProps {
  id: number;
  title: string;
  description: string;
  subTasks: SubTask[];
  status: string;
  taskMembers: User[];
  projectColumns?: ProjectColumn;
}

const Card: React.FC<CardProps> = (props) => {
  console.log('Props ====>', props);
  const { mode } = useDarkMode();
  // console.log('props' ,props)

  const {
    setActiveTaskId,
    showModal,

    setActiveTaskData,
  } = useTaskStore();

  const handleTaskClick = (taskId: number, props: Task) => {
    setActiveTaskId(taskId);
    setActiveTaskData(props);
    showModal();
    return;
  };
  // console.log("=====>",props.projectColumns)
  // console.log('activeTaskId',activeTaskId);

  // console.log(props);
  const totalTask = props.subTasks.length;
  const completedTask = useMemo(
    () =>
      props.subTasks.filter((subTask: SubTask) => subTask.status === 'DONE'),
    [props.subTasks]
  );
  console.log({ totalTask });
  console.log(completedTask.length);
  return (
    <AnimatePresence>
      <motion.article
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className={`${mode === 'light' ? 'lightmode' : 'bg-dark'} card`}
        onClick={() => handleTaskClick(props.id, props)}>
        <p className={mode === 'light' ? 'font-black' : 'font-white'}>
          {props.title || 'Build UI for onboarding flow'}
        </p>
        <p className='color-dark-white font-sm'>
          <span>{completedTask.length} </span>of<span> {totalTask} </span>
          subtasks
        </p>
      </motion.article>
    </AnimatePresence>
  );
};

export default Card;
