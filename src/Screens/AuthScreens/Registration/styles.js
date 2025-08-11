import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.white,
    },
    container: {
      flex: 1,
    },
    contentContainerStyle: {
      paddingBottom: hp(5),
    },
    headingContainer: {
      padding: 10,
    },
    inputContainer: {
      padding: 30,
    },
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
  });
};
export default useStyle;
