import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  const {width} = Dimensions.get('window');
  return StyleSheet.create({
    mainView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      paddingVertical: 8,
      width: width / 1.1,
      marginLeft: 15,
      marginBottom: 10,
    },
    inputStyle: {
      borderColor: colors.primary,
      borderRadius: 13,
      height: hp(5),
      width: wp(72),
    },
    filter: {
      width: 37,
      height: 37,
    },
    filterMargin: {
      marginRight: 15,
    },
    searchImage: {
      height: 20,
      width: 20,
      marginHorizontal: 10,
    },
    searchText: {
      marginLeft: wp(1),
      color: colors.aluminum,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: colors.primary,
      borderRadius: 13,
      height: hp(5),
      width: wp(72),
      borderWidth: 1,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: colors.primary,
      borderRadius: 13,
      height: hp(5),
      width: wp(72),
      borderWidth: 1,
      marginBottom: 10,
    },
  });
};
export default useStyle;
