import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Images} from '../../../Constant';
import {
  TextInput,
  ForgotPasswordModal,
  AuthHeader,
  AuthFooter,
  Loader,
  VerifyOtp,
} from '../../../Components';
import useLogin from './useLogin';
import useStyle from './styles';

const Login = () => {
  const styles = useStyle();
  const {
    control,
    passwordRef,
    modalRef,
    loader,
    verifyOtpRef,
    googleLoading,
    email,
    emailRefValue,
    sendOtpHandler,
    registerHandler,
    googleHandler,
    onSubmitHandler,
  } = useLogin();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthHeader title="Login" description="Welcome back" />
          <View style={styles.inputContainer}>
            <TextInput
              name="email"
              returnKeyType="next"
              placeholder="Email/User Name"
              control={control}
              image={Images.email}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <TextInput
              name="password"
              placeholder="* * * * * * * *"
              returnKeyType="done"
              control={control}
              isSecureTextEntry={true}
              image={Images.password}
              containerStyle={styles.passwordInput}
              ref={passwordRef}
            />
            <TouchableOpacity onPress={() => modalRef?.current?.show()}>
              <Text style={styles.forgotPassword}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
          <AuthFooter
            buttonTitle="LOGIN"
            accountPrefixText="Don’t have an account?"
            accountPostfixText="Register"
            loader={loader}
            onPress={onSubmitHandler}
            onPressText={registerHandler}
            onPressGoogle={googleHandler}
            onPressFacebook={() => {
              _signIn('facebook');
            }}
          />
          <ForgotPasswordModal ref={modalRef} />
          <VerifyOtp
            ref={verifyOtpRef}
            email={email ?? emailRefValue?.current}
            onPressResend={sendOtpHandler}
          />
          <Loader isVisible={googleLoading} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;
