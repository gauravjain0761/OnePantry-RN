import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    mainView: {
      height: hp(12),
      paddingHorizontal: 20,
      marginTop: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icon: {
      width: 20,
      height: 22,
    },
    textView: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
    },
    text: {
      fontWeight: '600',
      fontSize: 18,
      color: colors.primary,
    },
  });
};
export default useStyle;
