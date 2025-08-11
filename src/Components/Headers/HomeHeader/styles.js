import {StyleSheet} from 'react-native';
import {wp} from '../../../Utils';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    bgImage: {
      width: wp(100),
    },
    logo: {
      height: 45,
      width: 45,
      position: 'absolute',
      alignSelf: 'center',
      top: 45,
    },
    toggle: {
      position: 'absolute',
      left: 20,
      top: 60,
    },
    sideBar: {
      width: 30,
      height: 30,
    },
    textContainer: {
      padding: 20,
    },
    helloText: {
      opacity: 0.5,
      fontSize: 16,
      fontWeight: '400',
      color: colors.black,
    },
    userName: {
      color: colors.gold,
    },
    description: {
      fontSize: 16,
      opacity: 0.5,
      fontWeight: '700',
      color: colors.black,
    },
  });
};
export default useStyle;
