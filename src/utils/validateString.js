const validateString = (str) => {
  let isValid = str.trim().length === 0 ? false : true;

  return isValid;
};

export default validateString;
