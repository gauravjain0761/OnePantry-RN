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
      gap: 10,
    },
    nameInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputContainer: {
      width: '95%',
      borderRadius: 35,
    },
    inputBorder: {
      borderRadius: 35,
    },
    mainView: {
      flex: 1,
      padding: 20,
    },
    textLabel: {
      fontWeight: '400',
      color: colors.placeholder,
      fontSize: 14,
      marginVertical: 5,
    },
    button: {
      marginTop: 25,
      borderRadius: 35,
    },
  });
};
export default useStyle;
