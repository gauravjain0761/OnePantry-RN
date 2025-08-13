import { StyleSheet } from "react-native";
import { colors } from "../../../Constant";
import { wp } from "../../../Utils";
import { hp } from "../../Config";
import { vs } from "react-native-size-matters";

const useStyle = () => {
  return StyleSheet.create({
    modal: {
      flex: 1,
      padding: 0,
      margin: 0,
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    modalView: {
      width: wp(100),
      paddingHorizontal: 10,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 20,
      backgroundColor: colors.white,
    },
    image: {
      alignSelf: "center",
      height: 160,
      width: 150,
    },
    textContainer: {
      paddingHorizontal: 10,
    },
    heading: {
      marginTop: 15,
      fontSize: 20,
      color: colors.primary,
      fontWeight: "600",
    },
    description: {
      marginTop: 10,
    },
    textInputContainer: {
      marginBottom: 20,
      marginTop: 10,
    },
    otpTextInput: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18,
      borderWidth: 1,
      backgroundColor: "white",
      borderColor: colors.primary,
      fontSize: 22,
      color: colors.primary,
      elevation: 5,
    },
    contentContainer: {
      alignItems: "center",
    },
    resendButton: {
      alignSelf: "center",
      marginBottom: 10,
    },
    resendText: {
      fontSize: 15,
      color: colors.primary,
      textDecorationLine: "underline",
      fontWeight: "500",
    },
    button: {
      marginHorizontal: 30,
    },
  });
};
export default useStyle;
