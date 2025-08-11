import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  TextInput,
  AuthHeader,
  AuthFooter,
  Loader,
  VerifyOtp,
} from '../../../Components';
import {Images} from '../../../Constant/Images';
import useRegistration from './useRegistration';
import useStyle from './styles';

const Registration = () => {
  const styles = useStyle();
  const {
    loader,
    control,
    firstNameRef,
    lastNameRef,
    email,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    verifyOtpRef,
    googleLoading,
    emailRefValue,
    sendOtpHandler,
    onSubmitHandler,
    accountHandler,
    googleHandler,
  } = useRegistration();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <AuthHeader title="Register" description="Create Account" />
          <View style={styles.inputContainer}>
            <TextInput
              name="userName"
              placeholder="User Name"
              control={control}
              image={Images.user}
              onSubmitEditing={() => firstNameRef.current?.focus()}
            />
            <TextInput
              name="firstName"
              placeholder="First Name"
              ref={firstNameRef}
              control={control}
              image={Images.user}
              containerStyle={styles.inputStyle}
              onSubmitEditing={() => lastNameRef.current?.focus()}
            />
            <TextInput
              name="lastName"
              placeholder="Last Name"
              ref={lastNameRef}
              control={control}
              image={Images.user}
              containerStyle={styles.inputStyle}
              onSubmitEditing={() => emailRef.current?.focus()}
            />
            <TextInput
              name="email"
              placeholder="Email"
              ref={emailRef}
              control={control}
              image={Images.email}
              containerStyle={styles.inputStyle}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <TextInput
              name="password"
              placeholder="* * * * * * * *"
              control={control}
              isSecureTextEntry={true}
              image={Images.password}
              containerStyle={styles.inputStyle}
              ref={passwordRef}
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
            <TextInput
              name="confirmPassword"
              placeholder="* * * * * * * *"
              returnKeyType="done"
              control={control}
              isSecureTextEntry={true}
              image={Images.password}
              containerStyle={styles.inputStyle}
              ref={confirmPasswordRef}
            />
          </View>
          <AuthFooter
            buttonTitle="REGISTER"
            accountPrefixText="Already have an account?"
            accountPostfixText="Login"
            onPressText={accountHandler}
            onPress={onSubmitHandler}
            onPressGoogle={googleHandler}
            loader={loader}
          />
          <Loader isVisible={googleLoading} />
          <VerifyOtp
            ref={verifyOtpRef}
            email={email ?? emailRefValue?.current}
            onPressResend={sendOtpHandler}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Registration;
