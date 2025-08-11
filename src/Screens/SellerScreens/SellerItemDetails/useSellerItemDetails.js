import {useCallback, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useGetCategoryQuery, useGetUserDataQuery} from '../../../Services';
import {ScreenNames} from '../../../Constant';

export default () => {
  const route = useRoute();
  const {navigate} = useNavigation();
  const productDetails = route?.params?.item ?? {};
  const {user_id = '', category_id = ''} = productDetails;

  const [count, setCount] = useState(1);
  const [defaultRating, setDefaultRating] = useState(2);
  // rtk queries
  const {data: UserData} = useGetUserDataQuery({docId: user_id});
  const {data: CategoryData = {}} = useGetCategoryQuery({docId: category_id});

  const navigationHandler = useCallback(() => {
    navigate(ScreenNames.SettingStack, {screen: ScreenNames.AddAddress});
  }, []);
  return {
    productDetails,
    CategoryData,
    UserData,
    count,
    defaultRating,
    setDefaultRating,
    setCount,
    navigationHandler,
  };
};
