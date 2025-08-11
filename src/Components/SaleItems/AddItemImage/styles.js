import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    heading: {
      fontSize: 14,
      color: colors.placeholder,
    },
    button: {
      height: hp(12),
      width: wp(26),
      marginTop: 15,
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: 11.5,
      borderColor: colors.mercury,
      backgroundColor: colors.alabaster,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addGreenCircle: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
    },
    imageTitle: {
      fontSize: 12,
      color: colors.placeholder,
      marginVertical: 8,
    },
    itemImage: {
      height: hp(12),
      width: wp(26),
      marginTop: 15,
      borderWidth: 1,
      borderRadius: 4,
      marginRight: 20,
      borderColor: colors.mercury,
    },
  });
};
export default useStyle;
