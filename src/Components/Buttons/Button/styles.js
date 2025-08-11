import {StyleSheet} from 'react-native';
import {hp} from '../../../Utils';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: hp(6),
      borderRadius: 19,
      backgroundColor: colors.primary,
      shadowColor: colors.grey,
      shadowOffset: {height: 3, width: 1},
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: Platform.OS === 'ios' ? 7 : null,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.white,
    },
  });
};
export default useStyle;
