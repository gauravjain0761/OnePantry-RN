import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 20,
      height: hp(28),
      width: wp(40),
      padding: 8,
      marginLeft: 12,
      marginBottom: 13,
    },
    productImage: {
      alignSelf: 'center',
      height: hp(20),
      width: wp(36),
      borderRadius: 12,
      marginBottom: 5,
    },
    infoCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    nameContainer: {
      flex: 1,
    },
    name: {
      fontWeight: '500',
      color: colors.primary,
      fontSize: 14,
      opacity: 0.5,
    },
    description: {
      fontWeight: '400',
      color: colors.black,
      fontSize: 8,
      opacity: 0.5,
    },
    price: {
      fontWeight: '500',
      color: colors.primary,
      fontSize: 15,
    },
    favoriteButton: {
      height: 30,
      width: 30,
      zIndex: 1,
      position: 'absolute',
      right: '5%',
      top: '5%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    favoriteImage: {
      height: '70%',
      width: '70%',
    },
    userActionContainer: {
      justifyContent: 'space-around',
      position: 'absolute',
      bottom: 55,
      right: 5,
    },
    actionImage: {
      alignSelf: 'center',
      height: hp(4),
      width: wp(8),
      borderRadius: 9,
      marginBottom: 7,
    },
  });
};
export default useStyle;
