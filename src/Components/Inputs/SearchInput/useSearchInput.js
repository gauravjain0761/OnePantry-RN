import {useNavigation} from '@react-navigation/native';
import {useMemo, useState, useRef, useCallback} from 'react';

export default () => {
  const snapPoints = useMemo(() => [1, '50%'], []);
  const bottomSheetRef = useRef(null);
  const [sheetIndex, setSheetIndex] = useState(0);
  const {navigate} = useNavigation();
  const navigateHandler = useCallback(() => {
    navigate('Search');
  }, []);
  return {
    snapPoints,
    bottomSheetRef,
    sheetIndex,
    navigateHandler,
    setSheetIndex,
  };
};
