import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      width: wp(90),
      alignSelf: 'center',
      borderRadius: 5,
      padding: 19,
      marginTop: 10,
      elevation: 2,
      backgroundColor: colors.white,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icon: {
      width: 15,
      height: 15,
    },
    title: {
      fontSize: 12,
      fontWeight: '400',
      color: colors.grey,
    },
  });
};
export default useStyle;
