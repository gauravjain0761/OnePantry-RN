import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { hp, wp } from "./Config";
import { colors } from "../Constant";

const Button = ({ title, style, color, onPress, loader }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {loader ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={[styles.ButtonText, color]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    height: hp(6),
    width: wp(50),
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    shadowColor: "grey", // IOS
    shadowOffset: { height: 3, width: 1 },
    shadowOpacity: 1, // IOS
    shadowRadius: 5,
    elevation: Platform.OS === "ios" ? 7 : null,
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Button;
