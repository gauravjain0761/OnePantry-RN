import { useCallback, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ScreenNames } from "../../../Constant";
import { LoginFormValidation } from "../../../Validations";
import {
  useGoogleAuthMutation,
  useLoginMutation,
  useSendOtpMutation,
} from "../../../Services";

export default () => {
  // refs
  const passwordRef = useRef(null);
  const modalRef = useRef(null);
  const verifyOtpRef = useRef(null);
  const emailRefValue = useRef("");
  const [loader, setLoader] = useState(false);
  // navigation hook
  const { navigate } = useNavigation();
  // hook form
  const {
    control,
    handleSubmit,
    watch,
    reset: resetForm,
  } = useForm({
    mode: "all",
    resolver: yupResolver(LoginFormValidation),
  });
  const email = watch("email");
  //rtk hooks
  const [login] = useLoginMutation();
  const [googleAuth, { isLoading: googleLoading }] = useGoogleAuthMutation();
  const [sendOtp] = useSendOtpMutation();
  // callback hooks

  const sendOtpHandler = useCallback(async () => {
    const currentEmail = watch("email") ?? emailRefValue?.current ?? "";
    const res = await sendOtp({ email: currentEmail });
    if (res) {
      verifyOtpRef?.current?.show();
    }
    setLoader(false);
  }, []);
  const registerHandler = useCallback(() => {
    resetForm();
    navigate(ScreenNames.Registration);
  }, []);

  const loginHandler = useCallback(async (data) => {
    setLoader(true);
    const response = await login(data);
    if (response?.data) {
      sendOtpHandler();
    } else {
      setLoader(false);
    }
  }, []);
  const onSubmitHandler = handleSubmit(loginHandler);

  const googleHandler = useCallback(async (data) => {
    emailRefValue.current = data?.email ?? "";
    console.log("data", data);

    const payload = {
      payload: {
        email: data?.email ?? "",
        idToken: data?.idToken,
      },
      isLogin: true,
    };

    const response = await googleAuth(payload);
    console.log("response", response);

    if (response?.data) {
      sendOtpHandler();
    }
  }, []);

  return {
    loader,
    control,
    passwordRef,
    modalRef,
    verifyOtpRef,
    googleLoading,
    email,
    emailRefValue,
    sendOtpHandler,
    googleHandler,
    handleSubmit,
    registerHandler,
    onSubmitHandler,
  };
};
