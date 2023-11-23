const Validations = (user: any) => {
  let errors = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const email_pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const password_pattern = /^[A-Za-z0-9]{8,}$/;

  //   if (user.fullname === "") {
  //     errors.fullname = "Name should not be Empty...";
  //   }
  console.log("user.email", user.email);
  if (!email_pattern.test(user.email)) {
    console.log("user.email", user.email);
    errors.email = "Email didn't meet the requirements";
  }
  //   if (user.password === "") {
  //     errors.password = "Password should not be Empty...";
  //   }
  //   if (user.phone === "") {
  //     errors.phone = "Phone should not be Empty...";
  //   }
  if (!password_pattern.test(user.password)) {
    errors.password = "Password didn't meet the requirements";
  }
  if (user.confirmPassword !== user.password) {
    errors.confirmPassword = "Password not matched";
  }
  return errors;
};

export default Validations;
