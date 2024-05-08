import React, { useState } from 'react';
import "./buttons.css"

const Button = ({ disabled, onClick, children }) => {
  return (
    <button className="custom-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

