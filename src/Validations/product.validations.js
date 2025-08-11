import * as yup from 'yup';
const stringValidation = errorMessage => {
  return yup.string().required(errorMessage);
};
const numberValidation = field => {
  return yup
    .number()
    .required(`${field} is required`)
    .integer(`${field} must be an integer`)
    .positive(`${field} must be a positive number`);
};

export const addProductFormValidation = yup.object().shape({
  name: stringValidation('Name is required'),
  category_id: stringValidation('Category is required'),
  subcategory_id: yup.string(),
  size: stringValidation('Size is required'),
  quantity: numberValidation('Quantity'),
  selling_price: numberValidation('Price'),
  expiry_date: stringValidation('Expiry date is required').matches(
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    'Date must be in the format MM/DD/YYYY',
  ),
  upc_code: stringValidation('Upc Number is required'),
  description: stringValidation('Description is required'),
});
