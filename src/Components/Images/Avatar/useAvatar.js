import * as ImagePicker from 'react-native-image-picker';
import {Alert} from 'react-native';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../Store';

export default props => {
  const user = useSelector(selectUser);
  const {onPress} = props;
  const onCameraHandler = useCallback(async () => {
    ImagePicker.launchImageLibrary(
      {
        maxHeight: 800,
        maxWidth: 800,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
      },
      e => {
        if (e.didCancel) {
          Alert.alert('No Image Selected');
        } else {
          onPress(e?.assets[0]);
        }
      },
    );
  }, []);
  return {user, onCameraHandler};
};
