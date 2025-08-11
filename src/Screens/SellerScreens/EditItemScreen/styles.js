import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    contentContainerStyle: {
      paddingBottom: hp(5),
      paddingHorizontal: 24,
      gap: 15,
    },
    inputContainer: {
      borderRadius: 35,
    },
    textLabel: {
      fontWeight: '400',
      color: colors.placeholder,
      fontSize: 14,
      marginVertical: 5,
    },
    button: {
      borderRadius: 35,
    },
    draftButton: {
      borderRadius: 35,
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.white,
    },
    draftButtonText: {
      color: colors.primary,
    },
  });
};
export default useStyle;
