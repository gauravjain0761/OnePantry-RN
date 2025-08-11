import {StyleSheet} from 'react-native';
import {colors} from '../../../Constant';
import {wp} from '../../../Utils';

const useStyle = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.white,
    },
    container: {
      flex: 1,
    },
    headingContainer: {
      padding: 10,
    },
    heading: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 35,
      color: colors.primary,
    },
    welCome: {
      color: colors.black,
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 20,
      opacity: 0.5,
      marginBottom: 20,
    },
    inputContainer: {
      padding: 30,
    },
    passwordInput: {
      marginTop: 10,
    },
    bottomView: {
      alignItems: 'center',
    },
    forgotPassword: {
      color: colors.black,
      textAlign: 'right',
      fontSize: 12,
      opacity: 0.5,
      marginRight: 4,
      marginTop: 10,
    },
    loginButton: {
      marginTop: 20,
      width: wp(50),
    },
    socialButton: {
      flexDirection: 'row',
      marginTop: 30,
    },
  });
};
export default useStyle;
