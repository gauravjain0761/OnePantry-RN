import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    activeButton: {
      width: 165,
      height: 45,
      borderRadius: 4,
      justifyContent: 'center',
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    inactiveButton: {
      backgroundColor: colors.alabaster,
    },
    buttonSecurity: {
      width: 165,
      height: 45,
      borderRadius: 14,
      justifyContent: 'center',
      borderColor: colors.primary,
    },
    activeText: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 15,
      color: colors.white,
    },
    inActiveText: {
      color: '#535763B2',
    },
    addButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      marginBottom: 30,
      backgroundColor: colors.primary,
      borderRadius: 44,
      width: wp(17),
      height: hp(8),
    },
    buttonColor: {
      color: colors.white,
      fontSize: 50,
      fontWeight: '300',
    },
    backImage: {
      width: 20,
      height: 22,
      marginTop: 20,
    },
    addItem: {
      textAlign: 'center',
      fontSize: 14,
      color: colors.primary,
    },
  });
};
export default useStyle;
