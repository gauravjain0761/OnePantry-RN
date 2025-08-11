import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import InputText from './InputText';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';
import {IMAGE, COLORS, TEXT} from '../Constant/Images/index';
// import CircleIcon from '../../Components/CircleIcon';
import useLoadingFn from '../Hook/useLoadingFn';
import AuthTextComponent from './AuthTextComponent';
import {wp, hp} from './Config';
import {useForm} from 'react-hook-form';
import {AuthContext} from '../Providers/AuthProvider';
import {vs} from 'react-native-size-matters';
import OTPTextView from 'react-native-otp-textinput';

export const ModalFn = ({modal, setmodal, active, setValue, setactive}) => {
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [newpasswordVisible, setNewPasswordVisibility] = useState(false);
  return (
    <Modal
      visible={modal}
      transparent={true}
      onRequestClose={() => setmodal(false)}
      animationType="slid">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: '#00000010',
        }}>
        <View
          style={{
            width: '100%',
            height: hp(68),
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 29,
            borderTopRightRadius: 29,
            position: 'relative',
          }}>
          <TouchableOpacity
            style={{
              padding: 15,
              width: wp(15),
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => setmodal(false)}>
            <Image source={IMAGE.Delete} style={{height: 22, width: 22}} />
          </TouchableOpacity>
          <Component
            setmodal={setmodal}
            setactiveref={setactive}
            activeref={active}
            modalref={setmodal}
            passwordVisible={passwordVisible}
            setPasswordVisibility={setPasswordVisibility}
            newpasswordVisible={newpasswordVisible}
            setNewPasswordVisibility={setNewPasswordVisibility}
          />
        </View>
      </View>
    </Modal>
  );
};

export const Component = ({
  setactiveref,
  activeref,
  modalref,
  setNewPasswordVisibility,
  newpasswordVisible,
  setPasswordVisibility,
  passwordVisible,
  setmodal,
}) => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    value,
    setValue,
    watch,
  } = useForm();
  const {API_CALL, otp, Logins, otpresend} = useContext(AuthContext);

  const ForgotPassword = useLoadingFn(API_CALL.ForgotPassword);
  const OtpVerify = useLoadingFn(API_CALL.OtpVerify);
  const ResendOtp = useLoadingFn(API_CALL.ResendOtp);

  const ResetPassword = useLoadingFn(API_CALL.ResetPassword);
  const ChangePassword = useLoadingFn(API_CALL.ChangePassword);
  const ResendOtpFn = data => {
    ResendOtp({
      params: {email: Logins?.email},
      onSuccess: () => {
        alert(` ${otpresend} Otp Send Your Email Successfully`);
      },
    });
  };

  const onVerifyLogin = data => {
    OtpVerify({
      params: {otp: Logins?.otp, email: Logins?.email},
      onSuccess: () => {
        successfullyRegister();
      },
    });
  };
  const onSubmit = data => {
    ForgotPassword({
      params: {...data},
      onSuccess: () => {
        setactiveref(2), reset(value);
      },
    });
  };
  const onVerify = data => {
    OtpVerify({
      params: {...data, email: otp.data.email},
      onSuccess: () => {
        setactiveref(3), reset(value);
      },
    });
  };
  const onResetPassword = data => {
    ResetPassword({
      params: {...data, email: otp.data.email},
      onSuccess: () => {
        setactiveref(4);
      },
    });
  };
  const onChangePassword = data => {
    if (data.password !== data.confirm_password) {
      Alert.alert(
        'Error',
        'Your New Password and Confirm Password  are  not same .',
        [
          {
            text: 'Ok',
            onPress: () => {
              navigation.navigate('BottomStack', {screen: 'Homes'});
            },
          },
        ],
      );
    } else {
      ChangePassword({
        params: {old_password: data.old_password, password: data.password},
        onSuccess: () => {
          Alert.alert(
            'Congrats',
            'Your password has been successfully changed.',
            [
              {
                text: 'Ok',
                onPress: () => {
                  setmodal(false);
                },
              },
            ],
          );
        },
      });
    }
  };

  console.log(Logins?.otp, Logins?.email, 'oooo', otpresend);
  const successfullyRegister = () => {
    Alert.alert('Congrats', 'Your account has been successfully verified.', [
      {
        text: 'Ok',
        onPress: () => {
          setmodal(false),
            navigation.navigate('BottomStack', {screen: 'Homes'});
        },
      },
    ]);
  };
  otp && console.log(otp.data.otp, 'otp recieved');
  switch (activeref) {
    case 1:
      return (
        <>
          <View>
            <Image
              source={IMAGE.ForgetPassword}
              style={{alignSelf: 'center', height: 160, width: 80}}
            />
            <AuthTextComponent
              title={'Forgot Password?'}
              text={TEXT.ForgetText}
            />
            <View style={{padding: 15}}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: COLORS.Green,
                  marginVertical: 5,
                  marginTop: -15,
                }}>
                Email Address
              </Text>
              <InputText
                label={' EMAIL '}
                textInputProps={{
                  placeholder: 'Email',
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                }}
                controllerProps={{
                  name: 'email',
                  control,
                  errors,
                  rules: {
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  },
                }}
                image={IMAGE.Greenmessage}
                style={{
                  borderColor: COLORS.Green,
                  borderRadius: 7,
                  height: hp(6),
                  width: wp(92),
                }}
              />
              <Button
                title={'Send Instruction'}
                style={{
                  marginTop: 10,
                  backgroundColor: COLORS.Green,
                  width: '100%',
                  height: hp(6),
                  borderRadius: 17,
                }}
                color={{color: '#fff'}}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </>
      );
    case 2:
      return (
        <>
          <View>
            <Image
              source={IMAGE.Verification}
              style={{alignSelf: 'center', height: 120, width: 120}}
            />
            <AuthTextComponent
              title={'Check Your Email'}
              text={TEXT.verificationText}
            />
            <View style={{padding: 18}}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: COLORS.Green,
                  marginVertical: 5,
                  marginTop: -10,
                }}>
                Verification Code
              </Text>
              <InputText
                label={' OTP '}
                textInputProps={{
                  placeholder: 'Otp',
                  keyboardType: 'email-address',
                  autoCapitalize: 'none',
                }}
                controllerProps={{
                  name: 'otp',
                  control,
                  value,
                  errors,
                  rules: {required: true},
                }}
                image={IMAGE.Greenkey}
                style={{
                  borderColor: COLORS.Green,
                  borderRadius: 7,
                  height: hp(6),
                }}
              />
              <Button
                title={'Continue'}
                style={{
                  marginTop: 10,
                  backgroundColor: COLORS.Green,
                  width: '100%',
                  height: hp(6),
                  borderRadius: 17,
                }}
                color={{color: '#fff'}}
                onPress={handleSubmit(onVerify)}
              />
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 13,
                  color: COLORS.Black,
                  opacity: 0.6,
                  marginTop: 45,
                  textAlign: 'center',
                }}>
                {'Did not receive the email? Check your spam folder or'}
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 13,
                  color: COLORS.Green,
                  textAlign: 'center',
                }}>
                {'try another Email Address'}
              </Text>
            </View>
          </View>
        </>
      );
    case 3:
      return (
        <>
          <View>
            <Image
              source={IMAGE.Reset}
              style={{alignSelf: 'center', width: 115, height: 115}}
            />
            <AuthTextComponent title={'Reset Password'} text={TEXT.resetText} />
            <View style={{padding: 18}}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: COLORS.Green,
                  marginVertical: 5,
                  marginTop: -25,
                }}>
                New Password
              </Text>
              <InputText
                label={' New Password '}
                rightIconProps={{
                  name: passwordVisible ? IMAGE.Greenkey : IMAGE.Show,
                  color: 'white',
                  onPress: () => setPasswordVisibility(!passwordVisible),
                }}
                textInputProps={{
                  placeholder: '* * * * * * * *',
                  autoCapitalize: 'none',
                  secureTextEntry: !passwordVisible,
                }}
                controllerProps={{
                  name: 'new_password',
                  control,
                  errors,
                  rules: {required: true},
                }}
                imageLast={IMAGE.Show}
                styleeye={{marginLeft: 0, right: 10}}
                style={{
                  borderColor: COLORS.Green,
                  borderRadius: 7,
                  height: hp(6),
                }}
                image={IMAGE.GreenLock}
              />
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: COLORS.Green,
                  marginVertical: 5,
                  marginTop: 5,
                }}>
                Confirm New Password
              </Text>
              <InputText
                label={' Confirm Password '}
                rightIconProps={{
                  name: newpasswordVisible ? IMAGE.Greenkey : IMAGE.Show,
                  color: 'white',
                  onPress: () => setNewPasswordVisibility(!newpasswordVisible),
                }}
                textInputProps={{
                  placeholder: '* * * * * * * *',
                  autoCapitalize: 'none',
                  secureTextEntry: !newpasswordVisible,
                }}
                controllerProps={{
                  name: 'confirm_password',
                  control,
                  errors,
                  rules: {required: true},
                }}
                imageLast={IMAGE.Show}
                styleeye={{marginLeft: 0, right: 10}}
                style={{
                  borderColor: COLORS.Green,
                  borderRadius: 7,
                  height: hp(6),
                }}
                image={IMAGE.GreenLock}
              />
              <Button
                title={'Reset Password'}
                style={{
                  marginTop: 10,
                  backgroundColor: COLORS.Green,
                  width: '100%',
                  height: hp(6),
                  borderRadius: 17,
                }}
                color={{color: '#fff'}}
                onPress={handleSubmit(onResetPassword)}
              />
            </View>
          </View>
        </>
      );
    case 4:
      return (
        <>
          <View>
            <Image
              source={IMAGE.Right}
              style={{alignSelf: 'center', height: 120, width: 120}}
            />
            <AuthTextComponent
              title={'Password Reset Successful'}
              text={TEXT.setPassword}
              styletwo={{marginLeft: 6}}
              style={{marginLeft: 6}}
            />
            <View style={{padding: 18}}>
              <Button
                title={'Go back to Login'}
                style={{
                  marginTop: 0,
                  backgroundColor: COLORS.Green,
                  width: wp(90),
                  height: hp(6),
                  borderRadius: 17,
                }}
                color={{color: '#fff'}}
                onPress={() => modalref(false)}
              />
            </View>
          </View>
        </>
      );

    case 5:
      return (
        <>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image
                source={IMAGE.otp_icon}
                style={{alignSelf: 'center', height: 160, width: 150}}
              />
              <View style={{width: wp(85)}}>
                <Text
                  style={{
                    marginTop: hp(3),
                    color: COLORS.Green,
                    fontSize: vs(15),
                    fontWeight: '600',
                  }}>
                  Enter OTP
                </Text>
                <Text style={{marginTop: vs(10)}}>
                  is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type sp
                </Text>
              </View>
              {/* <OTPInputView
             selectionColor={COLORS.Green}
              style={{ width: '80%', height: 110 }}
              pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { }}
             autoFocusOnLoad
             codeInputFieldStyle={styles.underlineStyleBase}
             codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code => {setotp_verify(code)
              console.log(`Code is ${code}, you are good to go!`)
            })}
          /> */}
              <View style={styles.contentContainer}>
                <OTPTextView
                  handleTextChange={this.handleTextChange}
                  containerStyle={styles.textInputContainer}
                  textInputStyle={styles.otpTextInput}
                  tintColor={COLORS.Green}
                  keyboardType="numeric"
                  inputCount={4}
                />
              </View>

              <TouchableOpacity
                onPress={() => ResendOtpFn()}
                style={{
                  alignSelf: 'center',
                  marginTop: vs(-9),
                  marginBottom: vs(5),
                }}>
                <Text
                  style={{
                    color: COLORS.Green,
                    textDecorationLine: 'underline',
                    fontSize: vs(10),
                    fontWeight: '500',
                  }}>
                  {Logins?.otp && Logins?.otp}
                </Text>

                <Text
                  style={{
                    color: COLORS.Green,
                    textDecorationLine: 'underline',
                    fontSize: vs(10),
                    fontWeight: '500',
                  }}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onVerifyLogin();
                }}
                activeOpacity={0.8}
                style={{
                  width: wp(85),
                  alignItems: 'center',
                  height: vs(43),
                  backgroundColor: COLORS.Green,
                  borderRadius: 37,
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Verify</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </>
      );
    case 6:
      return (
        <>
          {/* <View> */}
          <ScrollView>
            <Image
              source={IMAGE.Reset}
              style={{alignSelf: 'center', width: 115, height: 115}}
            />
            <AuthTextComponent title={'Reset Password'} text={TEXT.resetText} />
            <View style={{padding: 18}}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: COLORS.Green,
                  marginVertical: 5,
                  marginTop: -25,
                }}>
                Old Password
              </Text>
              <InputText
                label={' Old Password '}
                rightIconProps={{
                  name: passwordVisible ? IMAGE.Greenkey : IMAGE.Show,
                  color: 'white',
                  onPress: () => setPasswordVisibility(!passwordVisible),
                }}
                textInputProps={{
                  placeholder: '* * * * * * * *',
                  autoCapitalize: 'none',
                  secureTextEntry: !passwordVisible,
                }}
                controllerProps={{
                  name: 'old_password',
                  control,
                  errors,
                  rules: {required: true},
                }}
                imageLast={IMAGE.Show}
                styleeye={{marginLeft: 0, right: 10}}
                style={{
                  borderColor: COLORS.Green,
                  borderRadius: 7,
                  height: hp(6),
                }}
                image={IMAGE.GreenLock}
              />
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: COLORS.Green,
                  marginVertical: 5,
                  marginTop: 5,
                }}>
                New Password
              </Text>
              <InputText
                label={' New Password '}
                rightIconProps={{
                  name: passwordVisible ? IMAGE.Greenkey : IMAGE.Show,
                  color: 'white',
                  onPress: () => setPasswordVisibility(!passwordVisible),
                }}
                textInputProps={{
                  placeholder: '* * * * * * * *',
                  autoCapitalize: 'none',
                  secureTextEntry: !passwordVisible,
                }}
                controllerProps={{
                  name: 'password',
                  control,
                  errors,
                  rules: {required: true},
                }}
                imageLast={IMAGE.Show}
                styleeye={{marginLeft: 0, right: 10}}
                style={{
                  borderColor: COLORS.Green,
                  borderRadius: 7,
                  height: hp(6),
                }}
                image={IMAGE.GreenLock}
              />
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: COLORS.Green,
                  marginVertical: 5,
                  marginTop: 5,
                }}>
                Confirm New Password
              </Text>
              <InputText
                label={' Confirm Password '}
                rightIconProps={{
                  name: newpasswordVisible ? IMAGE.Greenkey : IMAGE.Show,
                  color: 'white',
                  onPress: () => setNewPasswordVisibility(!newpasswordVisible),
                }}
                textInputProps={{
                  placeholder: '* * * * * * * *',
                  autoCapitalize: 'none',
                  secureTextEntry: !newpasswordVisible,
                }}
                controllerProps={{
                  name: 'confirm_password',
                  control,
                  errors,
                  rules: {required: true},
                }}
                imageLast={IMAGE.Show}
                styleeye={{marginLeft: 0, right: 10}}
                style={{
                  borderColor: COLORS.Green,
                  borderRadius: 7,
                  height: hp(6),
                }}
                image={IMAGE.GreenLock}
              />
              <Button
                title={'Reset Password'}
                style={{
                  marginTop: 10,
                  backgroundColor: COLORS.Green,
                  width: '100%',
                  height: hp(6),
                  borderRadius: 17,
                }}
                color={{color: '#fff'}}
                onPress={handleSubmit(onChangePassword)}
              />
            </View>
          </ScrollView>
          {/* </View> */}
        </>
      );
  }
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'red',
  },
  textInputContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  otpTextInput: {
    width: 50,
    height: 50,
    borderRadius: 28,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: COLORS.Green,
    fontSize: 22,
    color: COLORS.Green,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: COLORS.Green,
    backgroundColor: 'red',
  },

  underlineStyleBase: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(8),
    borderWidth: 1,
    // borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: '#a3de87',
    fontSize: vs(22),
    color: COLORS.Green,
    elevation: 5,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.Green,
    // backgroundColor:'red'
  },
});
