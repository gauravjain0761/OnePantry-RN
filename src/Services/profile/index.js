import {ReducerPath} from '../../Constant';
import {api, baseUrl} from '../api.service';

export const profileApi = api(ReducerPath.profileApi).injectEndpoints({
  endpoints: build => ({
    addAddress: build.mutation({
      query: body => {
        return {
          url: `${baseUrl}user/upsertAddress`,
          method: 'POST',
          body,
        };
      },
    }),
    deleteAddress: build.mutation({
      query: body => {
        return {
          url: `${baseUrl}user/deleteAddress`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {useAddAddressMutation, useDeleteAddressMutation} = profileApi;
