// import React, { useState } from 'react';
// import "./buttons.css"

// const Button = ({ disabled, onClick, children }) => {
//   return (
//     <button className="custom-button" disabled={disabled} onClick={onClick}>
//       {children}
//     </button>
//   );
// };

// export default Button;

import React, { useState } from "react";
import './Button.css';

function Button({ label, onClick, disabled }) {
  return (
    <button className="button" disabled={disabled} onClick={onClick}>{label}</button>
  );
}
export default Button;