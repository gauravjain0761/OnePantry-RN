import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    mainView: {
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
      width: wp(90),
      height: hp(9.4),
      borderRadius: 5,
      padding: 19,
      marginTop: 10,
      elevation: 2,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    editView: {
      height: hp(5),
      width: wp(75),
      fontSize: 14,
      color: colors.placeholder,
      fontWeight: '400',
      right: 5,
      top: 4,
      backgroundColor: colors.mercury,
    },
    emptyView: {
      height: hp(5),
      width: wp(75),
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
