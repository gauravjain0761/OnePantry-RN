import React, {useState} from 'react';
import {API} from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
export const AuthContext = React.createContext();
const AuthProvider = ({children}) => {
  // const navigation = useNavigation();
  const [redisterData, setredisterData] = useState('');
  const [Logins, setLogin] = useState('');
  const [userDetail, setUserDetail] = useState('');
  const [otp, setotp] = useState('');
  const [otpresend, setotpresend] = useState('');
  const API_CALL = {
    Registration: async (params, onSuccess) => {
      try {
        console.log('Registration function');
        const res = await API.post('user/sign-up', params);
        console.log('Registration request data:', params); // Log request data
        console.log(res);
        setredisterData(res.data);
        await AsyncStorage.setItem('user_type', 'user');
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error('Registration error:', error);
        throw error; // Rethrow or handle the error appropriately
      }
    },
    Login: async (params, onSuccess) =>
      await API.post('user/sign-in', params).then(res => {
        // AsyncStorage.setItem('token', res.data.data.token);
        // console.log(res.data.data,'res.data.data');
        // AsyncStorage.setItem('user_type', 'user');
        // AsyncStorage.setItem('user_id', res.data.data.userId);
        // setLogin(res.data)
      }),
    UserDetail: async (params, onSuccess) => {
      console.log('PRODUCT DETAILS FUNCTION');
      try {
        const data = await authMiddleware('user/detail-user', params, 'POST');
        console.log('Data received:', data);
        setUserDetail(res.data.data);
        if (onSuccess) onSuccess(data); // Call the onSuccess callback if provided
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    ForgotPassword: async (params, onSuccess) =>
      await API.post('user/forget-password', params).then(res => {
        setotp(res.data),
          Alert.alert('Your reset password OTP is', '' + res.data.data.otp);
      }),
    OtpVerify: async (params, onSuccess) =>
      await API.post('user/verify-otp', params).then(res => {
        AsyncStorage.setItem('token', res.data.data.token),
          console.log(res.data, 'otp verfied successfully');
      }),
    ResetPassword: async (params, onSuccess) =>
      await API.put('user/update-password', params).then(res => {
        console.log(res.data, 'forgot-passwordchange-password');
      }),
    ChangePassword: async (params, onSuccess) =>
      await API.put('user/change-password', params).then(res => {
        console.log(res.data, 'change-passwordchange-password');
      }),
    ResendOtp: async (params, onSuccess) =>
      await API.post('user/resend-otp', params).then(res => {
        setotpresend(res.data.data.otp),
          console.log(res.data.data, 'otp verfied successfully');
      }),
  };

  return (
    <AuthContext.Provider
      value={{
        API_CALL,
        redisterData,
        setredisterData,
        Logins,
        setLogin,
        userDetail,
        setUserDetail,
        otp,
        setotp,
        otpresend,
        setotpresend,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
