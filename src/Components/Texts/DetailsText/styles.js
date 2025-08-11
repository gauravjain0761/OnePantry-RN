import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    text: {
      fontWeight: '700',
      fontSize: 18,
      color: colors.primary,
      marginBottom: 8,
    },
    value: {
      fontWeight: '400',
      fontSize: 13,
      color: colors.black,
      opacity: 0.6,
    },
  });
};
export default useStyle;
