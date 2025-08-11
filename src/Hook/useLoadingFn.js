import {useContext} from 'react';
import {Alert} from 'react-native';
import {AppContext} from '../Providers/AppProvider';

export default useLoadingFn = fn => {
  const {setLoading, ActiveErrorPopup, setActiveErrorPopup} =
    useContext(AppContext);
  const loadingFunction = async ({params, onSuccess, onFail, screenName}) => {
    // setLoading(true)
    try {
      await fn(params);
      setLoading(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onFail) onFail();
      //console.log(error?.response?.data?.message,'error?.response?.data?.message')
      setActiveErrorPopup({
        state: true,
        message: error?.response?.data?.message,
      });
      // Alert.alert(screenName ? screenName : 'Login',error?.response?.data?.message || 'Something went wrong, Please try again.')
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return loadingFunction;
};
