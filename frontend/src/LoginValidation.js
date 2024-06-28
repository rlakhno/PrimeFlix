

function validation(values) {
  let message = {};
  // Regular expression for basic email validation
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (values.email === "") {
    message.email = "Email should not be empty";
  }
  else if (!email_pattern.test(values.email)) {
    message.email = "Email did not match";
  } else {
    message.email = "";
  }

  if (values.password === "") {
    message.password = "Password should not be empty";
  } else {
    message.password = "";
  }

  const isError = message.email || message.password;
  return {isError, message};
}

export default validation;