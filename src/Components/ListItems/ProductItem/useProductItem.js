import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ShowAlert} from '../../../Utils';
import {
  usePublishProductMutation,
  useDeleteProductMutation,
} from '../../../Services';
import {productStatus} from '../../../Constant';

export default () => {
  const {navigate} = useNavigation();
  const [publishProduct] = usePublishProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const publishProductHandler = useCallback(async data => {
    console.log(data);
    await publishProduct(data);
  }, []);

  const deleteProductHandler = useCallback(async data => {
    await deleteProduct(data);
  }, []);
  // navigation handler

  const deleteHandler = useCallback((id, isDraft) => {
    const alertObject = {
      title: 'Delete Item',
      message: 'You want delete this item?',
      okText: 'YES',
      cancelText: 'NO',
      onPressOk: () =>
        deleteProductHandler({
          id,
          status: isDraft ? productStatus.Draft : productStatus.Published,
        }),
    };
    ShowAlert(alertObject);
  }, []);
  const publishHandler = useCallback((id, isDraft) => {
    const alertObject = {
      title: isDraft ? 'Publish Item' : 'Unpublish Item',
      message: isDraft
        ? 'You want to publish this item?'
        : 'You want to Unpublish this item?',
      okText: 'Confirm',
      onPressOk: () =>
        publishProductHandler({
          id,
          status: isDraft ? productStatus.Draft : productStatus.Published,
        }),
    };
    ShowAlert(alertObject);
  }, []);

  const navigationHandler = useCallback((screeName, params) => {
    navigate(screeName, params);
  }, []);
  return {navigationHandler, deleteHandler, publishHandler};
};
