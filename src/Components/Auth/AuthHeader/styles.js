import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 35,
      color: colors.primary,
    },
    description: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 20,
      opacity: 0.5,
      marginBottom: 20,
      color: colors.black,
    },
  });
};
export default useStyle;
