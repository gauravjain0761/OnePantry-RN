import React, {forwardRef, useImperativeHandle} from 'react';
import Modal from 'react-native-modal';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {Images} from '../../../Constant';
import {TextInput} from '../../Inputs';
import {Button} from '../../Buttons';
import useResetPassword from './useResetPassword';
import useStyle from './styles';

const ResetPasswordModal = forwardRef((_, ref) => {
  const styles = useStyle();
  const {isLoading, isVisible, control, setVisible, onClose, onSubmitHandler} =
    useResetPassword();

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }));

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      style={styles.modal}
      avoidKeyboard
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={Images.delete} style={styles.closeImage} />
        </TouchableOpacity>
        <Image
          source={Images.reset}
          resizeMode="contain"
          style={styles.images}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.description}>
            Please make sure your new password must be different from previously
            used password.
          </Text>
          <TextInput
            label="Old Password"
            name="password"
            returnKeyType="next"
            placeholder="* * * * * * * *"
            control={control}
            isSecureTextEntry={true}
            image={Images.greenLock}
            containerStyle={styles.inputStyle}
            labelStyle={styles.label}
          />
          <TextInput
            label="New Password"
            name="newPassword"
            returnKeyType="next"
            placeholder="* * * * * * * *"
            control={control}
            isSecureTextEntry={true}
            image={Images.greenLock}
            containerStyle={styles.inputStyle}
            labelStyle={styles.label}
          />
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            returnKeyType="done"
            placeholder="* * * * * * * *"
            control={control}
            isSecureTextEntry={true}
            image={Images.greenLock}
            containerStyle={styles.inputStyle}
            labelStyle={styles.label}
          />
          <Button
            title={'Reset Password'}
            style={styles.button}
            loader={isLoading}
            onPress={onSubmitHandler}
          />
        </View>
      </View>
    </Modal>
  );
});

export default ResetPasswordModal;
