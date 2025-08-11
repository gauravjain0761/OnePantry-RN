import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../Utils';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    label: {
      color: colors.textGray,
      fontSize: 16,
      fontWeight: '700',
    },
    selectedLabel: {
      color: colors.white,
    },
    item: {
      height: 55,
      borderRadius: 12,
    },
    selectedItem: {
      backgroundColor: colors.primary,
    },
    icon: {
      width: 22,
      height: 22,
      marginRight: -15,
      resizeMode: 'contain',
      marginLeft: 5,
    },
    selectedIcon: {
      tintColor: colors.white,
    },
  });
};
export default useStyle;
