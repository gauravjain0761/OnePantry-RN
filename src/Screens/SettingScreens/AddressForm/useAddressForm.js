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
  const {control, watch, setValue, handleSubmit} = useForm({
    mode: 'all',
    defaultValues: {
      country: Countries[0].value,
    },
    resolver: yupResolver(addressFormValidation),
  });
  const country = watch('country');
  const state = watch('state');
  const {type = ''} = route?.params ?? {};

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
        address: data,
      };
      const response = await addAddress(payload);
      if ('data' in response) {
        goBack();
        showPopup('Address add Successfully');
      }
    },
    [type, id],
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
