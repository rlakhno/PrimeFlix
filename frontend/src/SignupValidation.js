
function validate(values) {
  let messages = {};
  // Regular expression for basic email validation
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  if (values.firstName === "") {
    messages.firstName = "First Name should not be empty";
  } else {
    messages.firstName = "";
  }

  if (values.lastName === "") {
    messages.lastName = "Last Name should not be empty";
  } else {
    messages.lastName = "";
  }


  if (values.email === "") {
    messages.email = "Email should not be empty";
  }
  else if (!email_pattern.test(values.email)) {
    messages.email = "Email did not match";
  } else {
    messages.email = "";
  }

  if (values.password === "") {
    messages.password = "Password should not be empty";
  } else {
    messages.password = "";
  }

  const isError = messages.firstName || messages.lastName || messages.email || messages.password;

  return {isError, messages};
}

export default validate;