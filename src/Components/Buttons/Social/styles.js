import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      height: 40,
      width: 40,
      borderRadius: 20,
      marginRight: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      color: colors.white,
      fontWeight: 'bold',
    },
  });
};
export default useStyle;
