import {StyleSheet} from 'react-native';
import {colors} from '../../Constant';
import {hp} from '../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mercury,
    },
    button: {
      marginTop: 20,
      backgroundColor: colors.primary,
      borderRadius: 15,
      alignSelf: 'center',
      marginBottom: 10,
      width: 170,
    },
    contentContainerStyle: {
      paddingBottom: hp(5),
    },
  });
};
export default useStyle;
