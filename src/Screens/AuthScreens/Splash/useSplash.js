import isEmpty from 'lodash/isEmpty';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../../Constant';
import {selectIsOnboarding, selectToken, selectUser} from '../../../Store';

export default () => {
  const navigation = useNavigation();
  const isOnboarding = useSelector(selectIsOnboarding);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const replaceScreen = (initialStack, screen) => {
    navigation.replace(initialStack, {
      screen: screen,
    });
  };
  const redirect = () => {
    if (!isOnboarding) {
      return replaceScreen(ScreenNames.AuthStack, ScreenNames.WalkThorough);
    }
    if (!isEmpty(token) && !isEmpty(user?.firstName)) {
      return replaceScreen(ScreenNames.DrawerStack, ScreenNames.Home);
    }
    replaceScreen(ScreenNames.AuthStack, ScreenNames.Login);
  };
  useEffect(() => {
    setTimeout(() => {
      redirect();
    }, 1000);
  }, []);

  return {};
};
