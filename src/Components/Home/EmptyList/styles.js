import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../Utils';
import {colors} from '../../../Constant';
const useStyle = () => {
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyFavorite: {
      width: 187,
      height: 200,
      marginTop: 20,
    },
    noItems: {
      color: colors.riverBed,
      fontSize: 21,
      fontWeight: 600,
    },
    refresh: {
      width: 50,
      height: 50,
      marginTop: 20,
    },
  });
};
export default useStyle;
