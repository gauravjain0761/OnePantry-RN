import {useMemo, useRef, useState} from 'react';

export default () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [1, '50%'], []);
  const [sheetIndex, setSheetIndex] = useState(0);
  return {sheetIndex, snapPoints, bottomSheetRef, setSheetIndex};
};
