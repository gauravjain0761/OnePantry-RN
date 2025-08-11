import Modal from 'react-native-modal';
import OTPTextView from 'react-native-otp-textinput';
import React, {forwardRef, useImperativeHandle} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {Images, colors} from '../../../Constant';
import {Button} from '../../Buttons';
import useResetPassword from './useVerifyOtp';
import useStyle from './styles';

const VerifyOtpModal = forwardRef((props, ref) => {
  const styles = useStyle();
  const {email = '', onPressResend} = props;
  const {isVisible, code, isLoading, setVisible, onVerifyHandler, setCode} =
    useResetPassword(email);

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }));

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      style={styles.modal}
      avoidKeyboard>
      <View style={styles.modalView}>
        <Image source={Images.otpIcon} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Enter OTP</Text>
          <Text style={styles.description}>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type sp
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <OTPTextView
            handleTextChange={setCode}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.otpTextInput}
            tintColor={colors.primary}
            keyboardType="numeric"
            inputCount={4}
          />
        </View>
        <TouchableOpacity onPress={onPressResend} style={styles.resendButton}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
        <Button
          onPress={onVerifyHandler}
          title={'Verify'}
          style={styles.button}
          disabled={code.length < 4}
          loader={isLoading}
        />
      </View>
    </Modal>
  );
});

export default VerifyOtpModal;
