import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../Utils';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginTop: 30,
    },
    prefixText: {
      fontSize: 14,
      color: colors.black,
      opacity: 0.5,
    },
    postfixText: {
      fontSize: 15,
      color: colors.primary,
      fontWeight: '700',
    },
  });
};
export default useStyle;
