import {useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useGetCategoriesQuery, useGetProductsQuery} from '../../../Services';

export default () => {
  const filterRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  // rtk query
  const {data, refetch} = useGetCategoriesQuery();
  const {
    data: productData,
    isLoading: productLoading,
    isFetching: productFetching,
  } = useGetProductsQuery();
  const categories = data?.data?.data ?? [];
  const products = productData?.data?.products ?? [];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  const loader = productFetching || productLoading;
  return {
    categories,
    filterRef,
    products,
    loader,
    refreshing,
    refetch,
    onRefresh,
  };
};
