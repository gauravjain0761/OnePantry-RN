import {yupResolver} from '@hookform/resolvers/yup';
import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ForgotPasswordValidation} from '../../../Validations';
import {useForgotPasswordMutation} from '../../../Services';
import {showPopup} from '../../../Utils';

export default () => {
  const [isVisible, setVisible] = useState(false);
  const {control, handleSubmit} = useForm({
    mode: 'all',
    resolver: yupResolver(ForgotPasswordValidation),
  });

  // rtk hooks
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();
  const onPressHandler = useCallback(() => {
    setVisible(false);
  }, []);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  const forgotPasswordHandler = useCallback(async data => {
    const response = await forgotPassword(data?.email);
    if (response?.data) {
      onClose();
      showPopup('Reset password instruction sent');
    }
  }, []);
  const onSubmitHandler = handleSubmit(forgotPasswordHandler);
  return {
    isVisible,
    control,
    isLoading,
    setVisible,
    onClose,
    onPressHandler,
    onSubmitHandler,
  };
};
