

import React, { useState } from "react";
import './Button.css';

function Button({ label, onClick, disabled }) {
  return (
    <button className="button" disabled={disabled} onClick={onClick}>{label}</button>

  );
}
export default Button;