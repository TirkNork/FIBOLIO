import React from 'react';
import './inputField.css';

const InputField = ({ type, name, value, onChange, placeHolder, className }) => {
  return (
    <input 
      type={type} 
      name={name}
      value={value}
      onChange={onChange} 
      placeHolder={placeHolder}
      className={className}
    />
  
  );
}

export default InputField;
