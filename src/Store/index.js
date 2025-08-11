import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import {userSliceReducer, configSliceReducer} from './Slices';
import actionReducer from '../../Shared/actionSlice';
import {
  authApi,
  verifyApi,
  configApi,
  categoriesApi,
  productsApi,
  saleItemsApi,
  categoryFakeApi,
  profileApi,
} from '../Services';
const reducers = combineReducers({
  user: userSliceReducer,
  config: configSliceReducer,
  actionSlice: actionReducer,
  [authApi.reducerPath]: authApi.reducer,
  [verifyApi.reducerPath]: verifyApi.reducer,
  [configApi.reducerPath]: configApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [saleItemsApi.reducerPath]: saleItemsApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [categoryFakeApi.reducerPath]: categoryFakeApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'config'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      authApi.middleware,
      configApi.middleware,
      categoriesApi.middleware,
      categoryFakeApi.middleware,
      productsApi.middleware,
      verifyApi.middleware,
      saleItemsApi.middleware,
      profileApi.middleware,
    ),
});

export * from './Slices';
