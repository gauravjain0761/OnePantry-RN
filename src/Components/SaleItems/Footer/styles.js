import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    addButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      marginBottom: 30,
      backgroundColor: colors.primary,
      borderRadius: 44,
      width: wp(17),
      height: hp(8),
    },
    buttonColor: {
      color: colors.white,
      fontSize: 50,
      fontWeight: '300',
    },
    backImage: {
      width: 20,
      height: 22,
      marginTop: 20,
    },
    addItem: {
      textAlign: 'center',
      fontSize: 14,
      color: colors.primary,
    },
  });
};
export default useStyle;
