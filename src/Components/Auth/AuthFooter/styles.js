import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    bottomView: {
      alignItems: 'center',
    },
    inputStyle: {
      marginTop: 10,
    },
    button: {
      marginTop: 20,
      width: wp(50),
      backgroundColor: colors.primary,
    },
    socialContainer: {
      flexDirection: 'row',
      marginTop: 30,
    },
  });
};
export default useStyle;
