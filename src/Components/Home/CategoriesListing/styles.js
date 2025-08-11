import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../Utils';
import {colors} from '../../../Constant';
const useStyle = () => {
  return StyleSheet.create({
    listingHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    title: {
      fontWeight: '600',
      fontSize: 14,
      color: colors.black,
      opacity: 0.5,
      marginTop: -17,
    },
    titleSee: {
      fontWeight: '400',
      color: colors.primary,
      fontSize: 10,
      marginTop: -10,
    },
    listContainer: {
      marginBottom: 15,
      marginLeft: 10,
    },
    itemContainer: {
      marginRight: 20,
      alignItems: 'center',
    },
    itemImage: {
      borderRadius: 13,
      height: 40,
      width: 40,
    },
    itemText: {
      fontWeight: '400',
      fontSize: 8,
      color: colors.black,
      marginTop: 5,
    },
  });
};
export default useStyle;
