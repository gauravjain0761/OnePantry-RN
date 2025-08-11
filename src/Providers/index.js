import axios from 'axios';
import React from 'react';
import AppProvider from './AppProvider';
import AuthProvider from './AuthProvider';
import HomeProvider from './HomeProvider';
import ProfileProvider from './ProfileProvider';
import SellerProvider from './SellerProvider';
import ShopProvider from './ShopProvidre';
import {store} from '../Store';
export const STATUS = {
  LOADING: 'laoding',
  ERROR: 'error',
};

export default Providers = ({children}) => {
  return (
    <AppProvider>
      <AuthProvider>
        <HomeProvider>
          <ShopProvider>
            <ProfileProvider>
              <SellerProvider>{children}</SellerProvider>
            </ProfileProvider>
          </ShopProvider>
        </HomeProvider>
      </AuthProvider>
    </AppProvider>
  );
};
export const Base_URL =
  'https://us-central1-onepantry-us.cloudfunctions.net/backend/api/v1/';
// export const Base_URL = 'http://localhost:3282/'

export const Image_URL = 'http://54.201.160.69:3282/';
// export const Image_URL = 'http://192.168.0.107:3282/ '
export const API = (instance = axios.create({
  baseURL: Base_URL,
  headers: {'Content-Type': 'application/json'},
}));
API.interceptors.request.use(async config => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: store.getState().user?.token ?? '',
    user_type: 'user',
  },
}));
