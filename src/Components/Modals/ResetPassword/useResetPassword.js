import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import {ResetFormValidation} from '../../../Validations';
import {useResetPasswordMutation} from '../../../Services';
import {showPopup} from '../../../Utils';
import {selectUser} from '../../../Store';

export default () => {
  const [isVisible, setVisible] = useState(false);
  const user = useSelector(selectUser);
  const {email = ''} = user ?? {};
  //hook form
  const {control, handleSubmit, reset} = useForm({
    mode: 'all',
    resolver: yupResolver(ResetFormValidation),
  });

  // rtk hooks
  const [resetPassword, {isLoading}] = useResetPasswordMutation();
  const onClose = useCallback(() => {
    setVisible(false);
    reset();
  }, [setVisible]);
  const resetPasswordHandler = useCallback(async data => {
    const {newPassword = '', password = ''} = data;
    if (newPassword === password) {
      return showPopup(
        'New password must be different from old password',
        true,
      );
    }
    const payload = {
      password,
      newPassword,
      email,
    };
    const response = await resetPassword(payload);
    if (response?.data) {
      onClose();
      showPopup('Password update Successfully');
    }
  }, []);
  const onSubmitHandler = handleSubmit(resetPasswordHandler);
  return {
    isVisible,
    control,
    isLoading,
    setVisible,
    onClose,
    onSubmitHandler,
  };
};
