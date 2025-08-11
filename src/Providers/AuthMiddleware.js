import firebase from '../../firebase';
import {setToken, store} from '../Store';
import {API} from './index';

export const authMiddleware = async (url, params = {}, method = 'POST') => {
  try {
    // Get the stored token
    let token = store.getState().user?.token ?? '';
    // Define headers with the token
    let headers = {
      Authorization: `${token}`,
    };

    // Make the API request
    const response = await API[method.toLowerCase()](url, params, {headers});
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Get the current Firebase user and refresh the token
      const user = firebase.auth().currentUser;
      if (user) {
        const newToken = await user.getIdToken(true); // Force refresh token
        store.dispatch(setToken(newToken));
        // Retry the API call with the new token
        const headers = {
          Authorization: `${newToken}`,
        };
        const response = await API[method.toLowerCase()](url, params, {
          headers,
        });

        return response.data;
      } else {
        throw error;
      }
    } else {
      throw error; // Rethrow the error for further handling
    }
  }
};
