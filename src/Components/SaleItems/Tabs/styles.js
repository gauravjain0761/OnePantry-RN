import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 20,
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
  });
};
export default useStyle;
