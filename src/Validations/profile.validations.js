import * as yup from 'yup';
const stringValidation = errorMessage => {
  return yup.string().required(errorMessage);
};
export const addressFormValidation = yup.object().shape({
  firstName: stringValidation('First name is required'),
  lastName: stringValidation('Last name is required'),
  address: stringValidation('Address is required'),
  apartment: stringValidation('Apartment is required'),
  country: stringValidation('Country is required'),
  city: stringValidation('City is required'),
  state: stringValidation('State is required'),
  zipCode: stringValidation('Zip code is required'),
});
