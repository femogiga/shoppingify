import React from 'react'

const SubstackCheckbox = ({title}) => {
  return (
    <div className='flex gap-x-1 item-center mbe-05 bg-darker p-x-05 p-y-05 rounded-sm color-dark-white'>
      <input type='checkbox' name='' id='' />
      <p>{title } </p>
    </div>
  );
}

export default SubstackCheckbox
