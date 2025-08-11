import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';
const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
    },
    button: {
      height: hp(6),
      width: wp(92),
      backgroundColor: colors.primary,
      borderRadius: 19,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      shadowColor: colors.black,
      shadowOffset: {height: 2, width: 1},
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: Platform.OS === 'ios' ? 7 : null,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.white,
    },
    activeDotStyle: {
      backgroundColor: colors.primary,
      width: wp(10),
      height: hp(1.2),
    },
    itemContainer: {
      padding: 20,
      height: hp(80),
    },
    itemButton: {
      padding: 5,
      marginTop: '10%',
      width: 70,
    },
    itemButtonSelected: {
      marginTop: '15%',
    },
    itemImage: {
      height: hp(2.5),
      width: wp(8),
    },
    initialImage: {
      alignItems: 'center',
      height: '70%',
      width: '100%',
    },
    titleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: '18%',
      width: '100%',
      marginTop: '10%',
    },
    title: {
      fontSize: 42,
      fontWeight: 'bold',
      color: colors.primary,
    },
    description: {
      fontSize: 14,
      fontWeight: '400',
      color: colors.black,
      textAlign: 'center',
    },
  });
};
export default useStyle;
