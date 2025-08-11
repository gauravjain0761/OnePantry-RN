import * as yup from 'yup';
const stringValidation = errorMessage => {
  return yup.string().required(errorMessage);
};
const yupEmail = stringValidation('Email is required.').email('Invalid Email');
const yupPassword = stringValidation('Password is  required')
  .min(8, 'Password too short')
  .min(8, 'Must be 8 characters or more')
  .matches(/[a-z]+/, 'One lowercase character')
  .matches(/[A-Z]+/, 'One uppercase character')
  .matches(/\d+/, 'One number');
const yupConfirmPassword = stringValidation('Password is  required').oneOf(
  [yup.ref('password'), null],
  'Passwords must match',
);

export const LoginFormValidation = yup.object().shape({
  email: yupEmail,
  password: yupPassword,
});
export const SignUpFormValidation = yup.object().shape({
  email: yupEmail,
  password: yupPassword,
  confirmPassword: yupConfirmPassword,
  userName: stringValidation('User name is required.'),
  firstName: stringValidation('First name is required.'),
  lastName: stringValidation('Last name is required.'),
});
export const ForgotPasswordValidation = yup.object().shape({
  email: yupEmail,
});
export const EditFormValidation = yup.object().shape({
  firstName: stringValidation('First name is required.'),
  lastName: stringValidation('Last name is required.'),
  image: yup.string(),
});
export const ResetFormValidation = yup.object().shape({
  password: yupPassword,
  newPassword: yupPassword,
  confirmPassword: stringValidation('Password is  required').oneOf(
    [yup.ref('newPassword'), null],
    'Passwords must match',
  ),
});
