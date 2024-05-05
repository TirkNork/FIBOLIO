// import { Link } from "react-router-dom";
import React, { useState } from "react";
import InputField from "../../components/inputField/inputField";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div class="input-field">
      <div class="FullName">
        <InputField
          type="text"
          // name="Name"
          value={name}
          onChange={handleNameChange}
          placeHolder="Enter your Name"
          className="FullName"
        />
        <InputField
          type="text"
          value={surname}
          onChange={handleSurnameChange}
          placeHolder="Enter your Surname"
          className="FullName"
        />
      </div>

      <div>
        <InputField
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeHolder="Enter your Email"
          // className="input-field"
        />
      </div>

      <div>
        <InputField
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeHolder="Create your password"
        />
      </div>
    </div>
  );
};

function RegisterTest() {
  return (
    // <header>Register</header>
    <div>
      <StudentForm />
    </div>
  );
}

export default RegisterTest;
