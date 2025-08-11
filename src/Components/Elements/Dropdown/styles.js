import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    dropdown: {
      width: '100%',
      borderRadius: 35,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: colors.mercury,
      backgroundColor: colors.alabaster,
    },
    icon: {
      marginRight: 5,
      color: colors.black,
    },
    label: {
      fontSize: 15,
      color: colors.black,
    },
    placeholderStyle: {
      fontSize: 14,
      color: colors.black,
    },
    selectedTextStyle: {
      marginLeft: 5,
      fontSize: 14,
      color: colors.black,
    },
    iconStyle: {
      width: 28,
      height: 20,
    },
    itemTextStyle: {
      color: colors.black,
    },
    labelStyle: {
      fontSize: 15,
      color: colors.black,
    },
  });
};
export default useStyle;
