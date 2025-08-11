import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    mainView: {
      width: wp(90),
      height: hp(9),
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      padding: 19,
      marginTop: 10,
      elevation: 2,
      backgroundColor: colors.white,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textTitle: {
      fontWeight: '400',
      fontSize: 12,
      color: colors.grey,
    },
    customRatingBarStyle: {
      flexDirection: 'row',
      marginTop: 10,
    },
    textRating: {
      fontSize: 14,
      fontWeight: '400',
      color: colors.primary,
      marginTop: 7,
    },
  });
};
export default useStyle;
