function dataValidation(values) {
  console.log("Enter dataValidation function");
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w@><#$(){}\[\]]{8,}$/;

  if (values.Name === "") {
    error.Name = "Name should not be empty.";
  } else {
    error.Name = "";
  }

  if (values.Surname === "") {
    error.Surname = "Surname should not be empty.";
  } else {
    error.Surname = "";
  }

  if (values.Email === "") {
    error.Email = "Email should not be empty.";
  } else if (!email_pattern.test(values.Email)) {
    error.Email = "Invalid Email Format.";
  } else {
    error.Email = "";
  }

  if (values.StudentID === "") {
    error.StudentID = "StudentID should not be empty.";
  } else {
    error.StudentID = "";
  }

  if (values.Password === "") {
    error.Password = "Password should not be empty.";
  } else if (!password_pattern.test(values.Password)) {
    error.Password =
      "Password must contain 8 characters with uppercase, lowercase, and special character.";
  } else {
    error.Password = "";
  }

  if (values.ConfirmPass === "") {
    error.ConfirmPass = "Confirm Password should not be empty.";
  } else if (values.ConfirmPass !== values.Password) {
    error.ConfirmPass = "Passwords don't match.";
  } else {
    error.ConfirmPass = "";
  }

  return error;
}

export default dataValidation;
