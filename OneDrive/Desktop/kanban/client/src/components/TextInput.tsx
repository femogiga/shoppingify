import React, { useEffect, useState } from 'react';

const TextInput = () => {
    const [title, setTitle] = useState('')
    useEffect(() => {
        console.log(title)
    },[title])
  return (
    <input
      type='text'
      style={{ width: '100%', padding: '.4rem' }}
      name='title'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default TextInput;
