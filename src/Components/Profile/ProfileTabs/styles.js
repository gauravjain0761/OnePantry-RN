import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    button: {
      justifyContent: 'center',
      width: 140,
      height: 45,
      borderWidth: 1,
      borderRadius: 20,
      marginRight: 8,
      borderColor: colors.primary,
    },
    activeButton: {
      backgroundColor: colors.primary,
    },
    title: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 15,
      color: colors.textGray,
    },
    selectedTitle: {
      color: colors.white,
    },
  });
};
export default useStyle;
