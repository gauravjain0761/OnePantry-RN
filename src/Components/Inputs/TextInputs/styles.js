import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 35,
      borderColor: colors.mercury,
      backgroundColor: colors.alabaster,
    },
    label: {
      fontWeight: '400',
      color: colors.primary,
      fontSize: 12,
      marginVertical: 5,
    },
    input: {
      flex: 1,
      height: 50,
      marginLeft: 10,
      borderRadius: 20,
      color: colors.grey,
    },
    multiline: {
      height: 75,
      paddingTop: 10,
    },
    image: {
      height: 20,
      width: 20,
      marginLeft: 10,
    },
    errorText: {
      color: colors.monza,
      marginTop: 5,
    },
  });
};
export default useStyle;
