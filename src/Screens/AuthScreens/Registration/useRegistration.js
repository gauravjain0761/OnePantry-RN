import {useCallback, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../../Constant';
import {SignUpFormValidation} from '../../../Validations';
import {
  createFireStoreDate,
  useCreateAccountMutation,
  useGoogleAuthMutation,
  useSendOtpMutation,
} from '../../../Services';

const defaultUser = {
  createdAt: createFireStoreDate,
  image: '',
  isActive: true,
  isAdmin: false,
  isDeleted: false,
  updatedAt: createFireStoreDate,
};
export default () => {
  // refs
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const verifyOtpRef = useRef(null);
  const emailRefValue = useRef('');
  const [loader, setLoader] = useState(false);

  const {navigate} = useNavigation();
  const {control, handleSubmit, setValue, watch} = useForm({
    mode: 'all',
    resolver: yupResolver(SignUpFormValidation),
  });
  const email = watch('email');
  // rtk hooks
  const [createAccount] = useCreateAccountMutation();
  const [googleAuth, {isLoading: googleLoading}] = useGoogleAuthMutation();
  const [sendOtp] = useSendOtpMutation();

  //
  const accountHandler = useCallback(() => {
    navigate(ScreenNames.Login);
  }, []);

  const sendOtpHandler = useCallback(async () => {
    const currentEmail = watch('email') ?? emailRefValue?.current ?? '';
    const res = await sendOtp({email: currentEmail});
    if (res) {
      verifyOtpRef?.current?.show();
    }
    setLoader(false);
  }, []);
  const createEmailUser = async data => {
    setLoader(true);
    const {confirmPassword, ...rest} = data;
    const payload = {
      payload: {
        ...rest,
        ...defaultUser,
        walletBalance: 0,
        rating: 0,
        followers: [],
      },
      isLogin: false,
    };
    const response = await createAccount(payload);
    if (response?.data) {
      await sendOtpHandler();
    } else {
      setLoader(false);
    }
  };
  const googleHandler = useCallback(async data => {
    emailRefValue.current = data?.email ?? '';
    const payload = {
      payload: {
        ...defaultUser,
        image: data?.photo ?? '',
        firstName: data?.givenName ?? '',
        lastName: data?.familyName ?? '',
        email: data?.email ?? '',
        userName: data?.givenName,
        idToken: data?.idToken,
        walletBalance: 0,
        rating: 0,
        followers: [],
      },
      isLogin: false,
    };
    const response = await googleAuth(payload);
    if (response?.data) {
      sendOtpHandler();
    }
  }, []);
  const onSubmitHandler = handleSubmit(createEmailUser);

  // Conditional Variables

  return {
    loader,
    control,
    firstNameRef,
    lastNameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    verifyOtpRef,
    email,
    googleLoading,
    emailRefValue,
    onSubmitHandler,
    accountHandler,
    googleHandler,
    sendOtpHandler,
  };
};
