import React from 'react';
import { Link } from "react-router-dom";

const TermsNconscheckBox = () => {
  return (
    <div>
        <input type="checkbox" name="checkbox"/>
        <p>I agree to the <Link to="/Test1">Terms and Conditions</Link></p>
    </div>
  );
}

export default TermsNconscheckBox;
