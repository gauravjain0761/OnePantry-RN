import REQUEST from './requestConfig';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {API} from './request';

const getFollowers = createAsyncThunk('getFollowers', async payload => {
  const response = await API.post(REQUEST.SETTING.FOLLOWER_LIST, payload);
  payload?.onSuccess(response);
  return response;
});

const followUnfollow = createAsyncThunk('followUnfollow', async payload => {
  const response = await API.post(REQUEST.SETTING.ADD_REMOVE_FOLLOWER, payload);

  const follow_response = await API.post(REQUEST.SETTING.FOLLOWER_LIST, {});

  return {follow_response, response};
});

const getOrders = createAsyncThunk('getOrders', async payload => {
  const response = await API.post(REQUEST.MY_ORDER.ORDER_LISTING, payload);
  return {response, payload};
});

const getOrderDetail = createAsyncThunk('getOrderDetail', async payload => {
  const response = await API.post(REQUEST.MY_ORDER.ORDER_DETAIL, payload);
  return response;
});

const addFaviourite = createAsyncThunk('addFeviourite', async payload => {
  const response = await API.post(REQUEST.HOME.FAVVORITE, payload);
  console.log(response, 'response==------------------------------>', payload);
  return response;
});
const productList = createAsyncThunk('productList', async payload => {
  console.log('first');
  const response = await API.post(REQUEST.HOME.PRODUCT_LIST, payload);
  console.log(
    response,
    'response==-PRODUCTLIST----------------------------->',
    payload,
  );
  return response;
});
const productDetail = createAsyncThunk('productDetail', async payload => {
  const response = await API.post(REQUEST.HOME.PRODUCT_DETAIL, payload);
  console.log(
    response,
    'response==-PRODUCTLIST----------------------------->',
    payload,
  );
  return response;
});

export {
  getFollowers,
  followUnfollow,
  getOrders,
  getOrderDetail,
  addFaviourite,
  productList,
  productDetail,
};
