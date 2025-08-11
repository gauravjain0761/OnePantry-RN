// Import the necessary Firebase modules
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';  // Import the auth module

import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from '@env';

// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      console.log("Firebase persistence set to LOCAL.");
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
    });
} else {
  firebase.app(); // Use existing app if already initialized
}

// Export the initialized Firebase instance to use in other components
export default firebase;