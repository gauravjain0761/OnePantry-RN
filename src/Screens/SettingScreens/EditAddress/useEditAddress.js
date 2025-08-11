import {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation, useRoute} from '@react-navigation/native';
import {addressFormValidation} from '../../../Validations';
import {useAddAddressMutation} from '../../../Services';
import {AddressType, Countries} from '../../../Constant';
import {selectUser} from '../../../Store';
import {showPopup} from '../../../Utils';

export default () => {
  const {goBack} = useNavigation();
  const route = useRoute();
  const user = useSelector(selectUser);
  const {id = ''} = user ?? {};

  const {type = '', address} = route?.params ?? {};
  const {control, watch, setValue, handleSubmit} = useForm({
    mode: 'all',
    defaultValues: {
      country: address?.country,
      city: address?.city,
      address: address?.address,
      apartment: address?.apartment,
      firstName: address?.firstName,
      lastName: address?.lastName,
      state: address?.state,
      zipCode: address?.zipCode,
    },
    resolver: yupResolver(addressFormValidation),
  });
  const country = watch('country');
  const state = watch('state');

  // rtk query
  const [addAddress, {isLoading}] = useAddAddressMutation();
  const addressHandler = useCallback(
    async data => {
      const payload = {
        type:
          type === 'billing'
            ? AddressType.billingAddress
            : AddressType.shippingAddress,
        userId: id,
        address: {...data, id: address?.id},
      };
      const response = await addAddress(payload);
      if ('data' in response) {
        goBack();
        showPopup('Address add Successfully');
      }
    },
    [type, id, address],
  );
  const setCountry = useCallback(
    data => {
      if (data !== country) {
        setValue('country', data, {shouldDirty: true});
        setValue('state', '', {shouldDirty: true});
      }
    },
    [country],
  );
  const setState = useCallback(data => {
    setValue('state', data, {shouldDirty: true});
  }, []);
  const onSubmitHandler = handleSubmit(data => addressHandler(data));

  return {
    type,
    control,
    country,
    isLoading,
    state,
    setState,
    setCountry,
    onSubmitHandler,
  };
};
