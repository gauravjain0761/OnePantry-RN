import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useCallback, useEffect} from 'react';
import {showPopup} from '../../../Utils';
import {GoogleError} from '../../../Constant';

export default (onPressGoogle, onPressFacebook) => {
  const googleHandler = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo?.idToken,
      );
      await auth().signInWithCredential(googleCredential);
      onPressGoogle({...userInfo?.user, idToken: userInfo?.idToken});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showPopup(GoogleError.heading, true);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showPopup(GoogleError.heading, true);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showPopup(GoogleError.heading, true);
      } else {
        showPopup(GoogleError.heading, true);
      }
    }
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '258235772106-v8i8kdosmcn77kuutbcitvkv89il2hmj.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);
  return {googleHandler};
};
