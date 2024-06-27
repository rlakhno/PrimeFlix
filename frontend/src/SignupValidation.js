
function Validation(values) {
  let error = {};
  // Regular expression for basic email validation
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (values.firstName === "") {
    error.firstName = "First Name should not be empty";
  } else {
    error.firstName = "";
  }

  if (values.lastName === "") {
    error.lastName = "Last Name should not be empty";
  } else {
    error.lastName = "";
  }


  if (values.email === "") {
    error.email = "Email should not be empty";
  }
  else if (!email_pattern.test(values.email)) {
    error.email = "Email did not match";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  }
  else if (!password_pattern.test(values.password)) {
    error.password = "Password did not match";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;