import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../Utils';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    image: {
      width: wp(75),
      height: hp(17),
      alignItems: 'center',
    },
    manImage: {
      width: 57,
      height: 57,
      position: 'absolute',
      bottom: 20,
      left: 20,
      borderRadius: 27,
    },
    imageStyle: {
      width: 57,
      height: 57,
    },
    firstName: {
      fontSize: 16,
      fontWeight: '600',
      position: 'absolute',
      bottom: 48,
      left: 90,
      color: colors.white,
    },
    email: {
      fontSize: 13,
      fontWeight: '500',
      position: 'absolute',
      bottom: 28,
      left: 90,
      color: colors.white,
    },
  });
};
export default useStyle;
