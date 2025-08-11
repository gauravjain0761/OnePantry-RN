import {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../Store';
import {ShowAlert, showPopup} from '../../../Utils';
import {
  useAddAddressMutation,
  useDeleteAddressMutation,
} from '../../../Services';
import {AddressType} from '../../../Constant';

export default () => {
  const {navigate} = useNavigation();
  const route = useRoute();
  const user = useSelector(selectUser);
  const {billingAddress = [], shippingAddress = [], id = ''} = user ?? {};
  const {type = ''} = route?.params ?? {};
  const address = type === 'shipping' ? shippingAddress : billingAddress;
  // states
  const [isSelected, setIsSelected] = useState(0);
  // rtk query
  const [deleteAddress] = useDeleteAddressMutation();
  const [addAddress, {isLoading}] = useAddAddressMutation();

  const deleteAddressHandler = useCallback(
    async addressId => {
      const data = {
        userId: id,
        type:
          type === 'billing'
            ? AddressType.billingAddress
            : AddressType.shippingAddress,
        addressId,
      };
      await deleteAddress(data);
    },
    [type, id],
  );
  const deleteHandler = useCallback(
    addressId => {
      const alertObject = {
        title: 'Delete Item',
        message: 'You want delete this item?',
        okText: 'YES',
        cancelText: 'NO',
        onPressOk: () => deleteAddressHandler(addressId),
      };
      ShowAlert(alertObject);
    },
    [type, id],
  );
  const selectAddressHandler = useCallback(async () => {
    const selectedAddress = address[isSelected];
    const payload = {
      type:
        type === 'billing'
          ? AddressType.billingAddress
          : AddressType.shippingAddress,
      userId: id,
      address: {...selectedAddress, isDefault: true},
    };
    await addAddress(payload);
    showPopup(`Default ${type} address updated`, false);
  }, [isSelected, address, type, id]);
  const navigationHandler = useCallback((screen, params) => {
    navigate(screen, params);
  }, []);
  useEffect(() => {
    if (address.length > 0) {
      const index = address?.findIndex(item => item?.isDefault);
      setIsSelected(index);
    }
  }, [address]);

  return {
    type,
    address,
    isSelected,
    isLoading,
    selectAddressHandler,
    deleteHandler,
    setIsSelected,
    navigationHandler,
  };
};
