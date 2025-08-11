import React, {forwardRef, useImperativeHandle} from 'react';
import Modal from 'react-native-modal';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {Images} from '../../../Constant';
import {TextInput} from '../../Inputs';
import useForgotPassword from './useForgotPassword';
import useStyle from './styles';
import {Button} from '../../Buttons';

const ForgotPasswordModal = forwardRef((_, ref) => {
  const styles = useStyle();
  const {isLoading, isVisible, control, setVisible, onClose, onSubmitHandler} =
    useForgotPassword();

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
          source={Images.forgetPassword}
          resizeMode="contain"
          style={styles.images}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.description}>
            Enter the email associated with your account and we’ll send an email
            instruction to reset your password.
          </Text>
          <TextInput
            label="Email Address"
            name="email"
            returnKeyType="done"
            placeholder="Email"
            control={control}
            image={Images.greenMessage}
            containerStyle={styles.inputStyle}
            labelStyle={styles.label}
          />
          <Button
            title={'Send Instruction'}
            style={styles.button}
            loader={isLoading}
            onPress={onSubmitHandler}
          />
        </View>
      </View>
    </Modal>
  );
});

export default ForgotPasswordModal;
