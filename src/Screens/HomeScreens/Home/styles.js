import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    contentContainer: {
      paddingHorizontal: 20,
    },
    search: {
      marginTop: 5,
      marginLeft: -16,
    },
    MainContainer: {
      flex: 1,
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
    listingHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    card: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 20,
      height: hp(20),
      width: wp(39),
      padding: 8,
      marginRight: 6,
      marginLeft: 12,
      marginBottom: 13,
    },
    button: {
      padding: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
    },
    modal: {
      margin: 0,
    },
    drawerContainer: {
      backgroundColor: '#fff',
      flex: 1,
      // padding: 20,
      width: '75%',
    },
    closeButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
    },
  });
};
export default useStyle;
