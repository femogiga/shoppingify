import React from 'react';

interface IColumnContainer {
  children: React.ReactNode;

  heading: string;
  noBorder?: boolean;
  taskCount: number;
  statusColor: string;
}

const ColumnContainer: React.FC<IColumnContainer> = ({
  children,
  heading,
  noBorder,
  taskCount,
  statusColor,
}) => {
  console.log({ taskCount });
  return (
    <div className='column-container p-x-1 '>
      {!noBorder && (
        <div className='flex item-center gap-x-05'>
          <div
            className='circle'
            style={{ backgroundColor: statusColor }}></div>
          <h4 className='font-white padding-block-1 color-dark-white'>
            {heading} <span>({taskCount})</span>
          </h4>
        </div>
      )}

      {children}
    </div>
  );
};

export default ColumnContainer;
