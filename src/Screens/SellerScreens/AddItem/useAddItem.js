import {useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {ScreenNames} from '../../../Constant';

export default () => {
  const [toggle, setToggle] = useState(1);
  const {navigate} = useNavigation();
  const navigationHandler = useCallback(() => {
    navigate(ScreenNames.AddItemScreen);
  });
  return {toggle, setToggle, navigationHandler};
};
