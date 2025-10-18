import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const Card = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });
  const { mode } = useDarkMode()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <article
      className={`${mode === 'light' ? 'lightmode' : 'bg-dark'} card`}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}>
      <p className={mode=== 'light' ? 'font-black': 'font-white'}>{title || 'Build UI for onboarding flow'}</p>
      <p className='color-dark-white font-sm'>
        <span>{1} </span>of<span> {3} </span>subtasks
      </p>
    </article>
  );
};

export default Card;
