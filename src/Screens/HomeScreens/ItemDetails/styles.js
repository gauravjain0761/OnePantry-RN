import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    imageStyle: {
      tintColor: colors.primary,
      width: 18,
      height: 18,
    },
    contentContainerStyle: {
      paddingBottom: 50,
    },
    weight: {
      fontWeight: '500',
      fontSize: 15,
      marginTop: 1,
      color: colors.boulder,
    },
    expiryTitle: {
      fontWeight: '500',
      fontSize: 14,
      color: colors.boulderBlack,
    },
    expiryValue: {
      color: colors.thunderbird,
      fontWeight: '500',
      fontSize: 11,
    },
    reviewTitle: {
      fontWeight: '500',
      fontSize: 14,
      marginTop: -25,
      color: colors.boulderBlack,
    },
    sellingPrice: {
      fontWeight: '500',
      fontSize: 24,
      color: colors.primary,
    },
    reviewValue: {
      color: colors.grey,
      fontWeight: '500',
      fontSize: 8,
    },
    ucpValue: {
      color: colors.grey,
      fontWeight: '400',
      fontSize: 11,
    },
    counterContainer: {
      width: wp(90),
      marginBottom: -10,
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    separator: {
      borderBottomWidth: 1,
      borderColor: '#E2E2E2C2',
      height: 20,
      width: 360,
      alignSelf: 'center',
    },
    separatorMargin: {
      height: 10,
      marginBottom: 7,
    },
    productDescriptionTitle: {
      color: colors.boulderBlack,
    },
    productDescriptionValue: {
      color: colors.boulder,
    },
    customRatingBarStyle: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
      marginRight: 10,
    },
  });
};
export default useStyle;
