import {Alert, Dimensions} from 'react-native';
import {showMessage} from 'react-native-flash-message';

export const wp = Value => {
  return (Dimensions.get('window').width / 100) * Value;
};
export const hp = Value => {
  return (Dimensions.get('window').height / 100) * Value;
};

export const ShowAlert = obj => {
  const {
    title = '',
    message = '',
    okText = 'OK',
    cancelText = 'Cancel',
    onPressOk = () => undefined,
    onPressCancel = () => undefined,
  } = obj;
  Alert.alert(title, message, [
    {text: okText, onPress: onPressOk},
    {text: cancelText, onPress: onPressCancel},
  ]);
};
export const showPopup = (description, isError = false) => {
  showMessage({
    message: isError ? 'Error' : 'Success',
    type: isError ? 'danger' : 'success',
    position: 'top',
    description: description,
    duration: 4000,
    statusBarHeight: 40,
  });
};
