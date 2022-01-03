export const isValidEmail = text => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  }
  return true;
};

export const isValidPassword = text => {
  if (text.length < 5) {
    return false;
  }
  return true;
};
