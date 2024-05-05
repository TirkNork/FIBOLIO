import React, { useState } from 'react';

const Button = ({ onClick, children, value }) => {
  const [mode, setMode] = useState('normal');

  const handleMouseEnter = () => {
    setMode('hovering');
  };

  const handleMouseLeave = () => {
    setMode('normal');
  };

  const handleMouseDown = () => {
    setMode('pressed');
  };

  const handleMouseUp = () => {
    setMode('normal');
  };

  return (
    <input
      type="button"
      onClick={onClick}
      value={value}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled={mode === 'disabled'}
      style={{
        backgroundColor: mode === 'hovering' ? 'lightgray' : 'white',
        border: '1px solid black',
        cursor: mode === 'disabled' ? 'not-allowed' : 'pointer',
        opacity: mode === 'disabled' ? 0.5 : 1,
      }}
    >
      {children}
    </input>
  );
};

export default Button;
