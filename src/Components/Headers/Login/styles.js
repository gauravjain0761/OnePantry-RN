import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../Utils';
const useStyle = () => {
  return StyleSheet.create({
    image: {
      width: wp(100),
      height: hp(27),
    },
    container: {
      height: hp(30),
      width: wp(100),
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: 110,
      width: 110,
      marginTop: 30,
    },
  });
};
export default useStyle;
