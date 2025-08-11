import {fakeBaseQuery, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {createApi} from '@reduxjs/toolkit/query/react';

export const baseUrl =
  'https://us-central1-onepantry-us.cloudfunctions.net/backend/api/v1/';
const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().user?.token;
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    return headers;
  },
});

export const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error) {
    console.log(result?.error, 'results');
  }

  return result;
};

export const api = reducerPath => {
  return createApi({
    reducerPath,
    baseQuery: baseQueryWithInterceptor,
    endpoints: () => ({}),
  });
};
export const fakeApi = reducerPath => {
  return createApi({
    reducerPath,
    baseQuery: fakeBaseQuery(),
    endpoints: () => ({}),
  });
};
