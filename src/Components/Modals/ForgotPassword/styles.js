import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    modal: {
      flex: 1,
      padding: 0,
      margin: 0,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    modalView: {
      width: wp(100),
      paddingHorizontal: 10,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 20,
      paddingBottom: 60,
      backgroundColor: colors.white,
    },
    closeButton: {
      paddingVertical: 15,
      alignSelf: 'flex-end',
    },
    closeImage: {
      height: 22,
      width: 22,
    },
    images: {
      alignSelf: 'center',
      height: 160,
      width: 80,
    },
    textContainer: {
      padding: 18,
    },
    title: {
      fontWeight: '700',
      color: colors.primary,
      fontSize: 18,
    },
    description: {
      marginTop: 8,
      marginBottom: 12,
      fontSize: 13,
      opacity: 0.6,
      color: colors.black,
      fontWeight: '400',
    },
    inputStyle: {
      borderColor: colors.primary,
      borderRadius: 7,
    },
    label: {
      fontWeight: '400',
      color: colors.primary,
      fontSize: 12,
      marginVertical: 5,
    },
    button: {
      marginTop: 10,
      backgroundColor: colors.primary,
      borderRadius: 17,
    },
  });
};
export default useStyle;
