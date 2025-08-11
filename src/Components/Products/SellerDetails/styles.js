import {StyleSheet} from 'react-native';
import {wp} from '../../../Utils';
import {colors} from '../../../Constant';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: wp(5),
      marginBottom: 20,
    },
    title: {
      marginBottom: 10,
      fontSize: 14,
      color: colors.black,
      fontWeight: '500',
    },
    infoContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    image: {
      height: 75,
      width: 75,
    },
    textContainer: {
      marginLeft: wp(4),
    },
    name: {
      fontSize: 15,
      color: colors.primary,
      fontWeight: '400',
    },
    email: {
      fontSize: 12,
      marginVertical: 7,
      color: colors.black,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    sendMessageContainer: {
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: colors.bombay,
    },
    buttonText: {
      paddingHorizontal: 20,
      fontSize: 15,
      color: colors.white,
    },
    followButton: {
      height: 25,
      marginLeft: 10,
      borderRadius: 15,
      minWidth: 100,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
export default useStyle;
