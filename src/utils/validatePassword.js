const validatePassword = (pw, confirmPw) => {
  // reject validation if passwords do not match
  if (pw.trim() !== confirmPw.trim()) {
    alert("Passwords do not match.");
    return false;
  }
  // validate length
  let isValid = pw.trim().length >= 7 ? true : false;
  alert("Password must be at least 7 characters.");
  return isValid;
};

export default validatePassword;
