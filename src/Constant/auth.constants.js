export const GoogleError = {
  heading: 'Google Sign in Failed',
  Cancel: 'User cancelled the login flow',
  Operation: 'operation (f.e. sign in) is in progress already',
  playService: 'play services not available or outdated',
};
export const createAccountError = (message = '') => {
  console.log(message);
  if (message === 'auth/email-already-in-use') {
    return 'That email address is already in use!';
  }
  if (message === 'auth/invalid-email') {
    return 'That email address is invalid!';
  }
  if (message === 'auth/weak-password') {
    return 'Password is too weak';
  }
  return 'An unexpected error occurred. Please try again.';
};
export const getEmailFilters = email => {
  const filters = [
    {field: 'email', operator: '==', value: email},
    {field: 'isAdmin', operator: '==', value: false},
  ];
  return filters;
};
