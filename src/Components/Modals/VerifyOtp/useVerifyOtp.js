import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useVerifyOtpMutation } from "../../../Services";
import { ScreenNames } from "../../../Constant";

export default (email) => {
  const [isVisible, setVisible] = useState(false);
  const [code, setCode] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const { reset } = useNavigation();
  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  const resetHandler = useCallback(() => {
    onClose();
    setTimeout(() => {
      reset({
        index: 0,
        routes: [{ name: ScreenNames.DrawerStack }],
      });
    }, 200);
  }, []);
  const onVerifyHandler = useCallback(async () => {
    const response = await verifyOtp({
      otp: code,
      email,
    });
    if (response?.data) {
      resetHandler();
    }
  }, [email, code]);

  return {
    isVisible,
    code,
    isLoading,
    onVerifyHandler,
    setVisible,
    onClose,
    setCode,
  };
};
