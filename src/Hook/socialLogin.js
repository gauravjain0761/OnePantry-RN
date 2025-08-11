import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const detail = await auth().signInWithCredential(googleCredential)
    return detail
}


const googleLogout = async () => {
  const  detail =   await   GoogleSignin.signOut()
  console.log(detail,'detaildetail')
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    // const signOutDetails = await auth().signOut()
    // console.log(signOutDetails, 'LOGOUT DETAILS >>>>>>>>>>')
    // .then(() => console.log('User signed out!'));
}


export {
    onGoogleButtonPress,
    googleLogout
}