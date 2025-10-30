import { useDroppable } from '@dnd-kit/core';
import React from 'react';

const ColumnContainer = ({ children, id, heading, noBorder, taskCount,statusColor }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    backgroundColor: isOver ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
    border: isOver && !noBorder ? '2px dashed #6366f1' : 'none',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  };
console.log({taskCount})
  return (
    <div
      className='column-container p-x-1 '
      ref={setNodeRef}
      style={style}
      id={id}>
      {!noBorder && (
        <div className='flex item-center gap-x-05'>
          <div
            className='circle'
            style={{ backgroundColor: statusColor }}></div>
          <h3 className='font-white padding-block-1 color-dark-white'>
            {heading} <span>({taskCount})</span>
          </h3>
        </div>
      )}

      {children}
    </div>
  );
};

export default ColumnContainer;
