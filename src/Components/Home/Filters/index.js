import {forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import BottomFilterComponent from '../../BottomFilterComponent';

const FilterComponent = (props, ref) => {
  const [sheetIndex, setSheetIndex] = useState(0);
  const snapPoints = useMemo(() => [1, '60%'], []);

  useImperativeHandle(ref, () => ({
    setSheetIndex,
  }));

  return (
    <BottomFilterComponent
      setSheetIndex={setSheetIndex}
      sheetIndex={sheetIndex}
      snapPoints={snapPoints}
      {...props}
    />
  );
};

export default forwardRef(FilterComponent);
