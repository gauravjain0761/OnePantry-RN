import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      width: wp(92),
      padding: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      alignItems: 'center',
    },
    title: {
      fontWeight: '600',
      fontSize: 18,
      color: colors.black,
    },
    likeImage: {
      width: 25,
      height: 25,
      marginRight: 6,
    },
    likedImage: {
      width: 23,
      height: 19,
      marginRight: 6,
    },
    addressContainer: {
      width: wp(40),
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    address: {
      fontSize: 14,
      color: 'black',
    },
    subTitleContainer: {
      width: wp(40),
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    subTitleText: {},
    valueContainer: {
      width: wp(40),
      alignItems: 'flex-end',
    },
    value: {
      fontWeight: '400',
      fontSize: 10,
      color: colors.grey,
    },
  });
};
export default useStyle;
