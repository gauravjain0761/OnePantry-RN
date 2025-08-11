import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, setToken, setUser} from '../Store';
import {getDocument} from '../Services';
import {Collections} from '../Constant';

export default () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const {id = ''} = user;
  useEffect(() => {
    if (id) {
      const unsubscribe = auth().onAuthStateChanged(async authUser => {
        let token = '';
        if (authUser) {
          token = await authUser.getIdToken();
        }
        dispatch(setToken(token));
        const response = await getDocument(Collections.users, [], user?.id);
        dispatch(setUser(response));
      });

      // Cleanup the listener on unmount
      return () => unsubscribe();
    }

    // Return a no-op function if user is falsy
    return () => {};
  }, [id]);

  return {};
};
