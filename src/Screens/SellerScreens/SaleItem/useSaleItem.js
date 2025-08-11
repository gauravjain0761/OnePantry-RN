import {useCallback, useState} from 'react';
import {debounce} from 'lodash';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  useGetSellerProductsQuery,
  useGetSellerDraftProductsQuery,
} from '../../../Services';
import {selectUser} from '../../../Store';
import {filterType, LIMIT, productStatus} from '../../../Constant';

export default () => {
  const {navigate} = useNavigation();
  const user = useSelector(selectUser);
  const {id = ''} = user ?? {};

  // states
  const [toggle, setToggle] = useState(1);
  const [publishData, setPublishData] = useState({
    filter_type: filterType.Asc,
    page: 1,
    search_key: '',
  });
  const [draftState, setDraftState] = useState({
    filter_type: filterType.Asc,
    page: 1,
    search_key: '',
  });

  //rtk queries
  const {
    data: publishedData,
    isLoading: isPublishedLoading,
    isFetching: isPublishedFetching,
  } = useGetSellerProductsQuery(
    {
      limit: LIMIT,
      list_type: productStatus.Published,
      user_id: id,
      ...publishData,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const {
    data: draftData,
    isLoading: draftLoading,
    isFetching: draftFetching,
  } = useGetSellerDraftProductsQuery({
    limit: LIMIT,
    list_type: productStatus.Draft,
    user_id: id,
    ...draftState,
  });

  // published api response
  const {products: publishedProducts, hasMore: publishedHasMore} =
    publishedData?.data ?? {};
  // draft api response
  const {products: draftProducts, hasMore: draftHasMore} =
    draftData?.data ?? {};
  // call backHandlers

  const onEndReachedPublished = useCallback(() => {
    if (!isPublishedLoading && !isPublishedFetching && publishedHasMore) {
      setPublishData(prevData => {
        return {...prevData, page: prevData.page + 1};
      });
    }
  }, [isPublishedLoading, isPublishedFetching, publishedHasMore]);

  const onEndReachedDraft = useCallback(() => {
    if (!draftLoading && !draftFetching && draftHasMore) {
      setDraftState(prevData => {
        return {...prevData, page: prevData.page + 1};
      });
    }
  }, [draftLoading, draftFetching, draftHasMore]);
  const searchQuery = async query => {
    if (toggle === 1) {
      return setPublishData(prevData => {
        return {...prevData, page: 1, search_key: query};
      });
    }
    return setDraftState(prevData => {
      return {...prevData, page: 1, search_key: query};
    });
  };

  const debouncedSearch = useCallback(
    debounce(query => {
      searchQuery(query);
    }, 500), // 500ms debounce delay
    [],
  );

  const navigationHandler = useCallback((screeName, params) => {
    navigate(screeName, params);
  }, []);

  const isPublishedFooter = !isPublishedLoading && isPublishedFetching;
  const isDraftFooter = !isPublishedLoading && isPublishedFetching;
  return {
    toggle,
    publishedProducts,
    isPublishedLoading,
    draftLoading,
    draftProducts,
    isPublishedFooter,
    isDraftFooter,
    debouncedSearch,
    onEndReachedDraft,
    onEndReachedPublished,
    setToggle,
    navigationHandler,
  };
};
