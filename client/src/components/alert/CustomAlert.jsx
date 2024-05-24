import React, { useEffect } from 'react';
import './CustomAlert.css'; // Assuming you will style this component with CSS

const CustomAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Close the alert after 3 seconds
    return () => clearTimeout(timer); // Clean up the timer
  }, [onClose]);

  return (
    <div className="custom-alert">
      {message}
    </div>
  );
};

export default CustomAlert;
