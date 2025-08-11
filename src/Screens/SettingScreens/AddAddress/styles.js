import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    addButton: {
      height: hp(7),
      borderWidth: 1,
      borderRadius: 12,
      borderColor: colors.primary,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      padding: 20,
      flex: 1,
    },
    image: {
      width: 26,
      height: 26,
      marginRight: 6,
    },
    buttonText: {
      color: colors.placeholder,
      fontSize: 14,
      marginLeft: 10,
      fontWeight: '400',
    },
    itemContainer: {
      marginTop: 5,
    },
    checkContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    checkButton: {
      height: hp(2.6),
      width: wp(5.5),
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkImage: {
      width: 20,
      height: 20,
    },
    checkText: {
      marginLeft: 10,
      fontSize: 17,
      color: colors.placeholder,
    },
    addressItemDetailContainer: {
      width: '100%',
      height: hp(15),
      borderWidth: 1,
      padding: 10,
      paddingLeft: 25,
      borderRadius: 10,
      marginTop: 10,
      borderColor: colors.athensGray,
      backgroundColor: colors.alabaster,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    nameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
    },
    name: {
      color: colors.placeholder,
      fontSize: 16,
    },
    buttonImage: {
      height: hp(4),
      width: wp(8),
    },
    deleteButton: {
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 5,
      right: 10,
    },
    addressText: {
      color: colors.grey,
      fontSize: 14,
      marginTop: 20,
      marginRight: 20,
    },
    button: {
      marginTop: 25,
      borderRadius: 35,
    },
    contentContainerStyle: {},
  });
};
export default useStyle;
