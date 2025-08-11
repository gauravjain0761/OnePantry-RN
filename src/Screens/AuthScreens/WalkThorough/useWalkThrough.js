import {useDispatch} from 'react-redux';
import {useCallback, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Images, ScreenNames, TEXT} from '../../../Constant';
import {setIsOnboarding} from '../../../Store';

export default () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const sliderRef = useRef();
  const slides = [
    {
      key: 1,
      title: 'Order for Food',
      text: TEXT.SlidFirst,
      imageOne: Images.onBoardingSecond,
      imageTwo: Images.add,
      onPress: 1,
    },
    {
      key: 2,
      title: 'Easy Payment',
      text: TEXT.SlidSecond,
      imageOne: Images.onBoardingThird,
      imageTwo: Images.add,
      onPress: 2,
    },
    {
      key: 3,
      title: 'Fast Delivery',
      text: TEXT.SlidThird,
      imageOne: Images.onBoardingFirst,
      imageTwo: Images.add,
      onPress: 2,
    },
  ];
  const onDone = useCallback(() => {
    dispatch(setIsOnboarding());
    navigate(ScreenNames.AuthStack, {screen: ScreenNames.Login});
  }, []);
  const itemHandler = useCallback(key => {
    key == 2
      ? sliderRef.current.goToSlide(0, true)
      : sliderRef.current.goToSlide(1, true);
  }, []);
  return {sliderRef, slides, onDone, itemHandler};
};
