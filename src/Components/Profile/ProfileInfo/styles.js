import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    mainView: {
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      width: wp(90),
      height: hp(9.4),
      borderRadius: 5,
      padding: 19,
      marginTop: 10,
      elevation: 2,
    },
    title: {
      fontWeight: '400',
      fontSize: 12,
      color: colors.grey,
    },
    value: {
      marginTop: 6,
      fontWeight: '400',
      fontSize: 14,
      color: colors.placeholder,
    },
    editImage: {
      width: 15,
      height: 15,
    },
  });
};
export default useStyle;
