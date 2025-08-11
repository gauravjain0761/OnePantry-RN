import {ReducerPath} from '../../Constant';
import {api, baseUrl} from '../api.service';
export const productApiInstance = ReducerPath.productsApi;
export const productsApi = api(productApiInstance).injectEndpoints({
  endpoints: build => ({
    getProducts: build.query({
      query: () => {
        return {
          url: `${baseUrl}user/home-screen-prod-list`,
          method: 'POST',
          body: {
            filter_type: 'Dsc',
          },
        };
      },
    }),
    getProductDetails: build.query({
      query: product_id => {
        return {
          url: `${baseUrl}user/home-screen-prod-detail`,
          method: 'POST',
          body: {
            product_id,
          },
        };
      },
    }),
    followUnFollow: build.mutation({
      query: body => {
        return {
          url: `${baseUrl}user/follow-unfollow`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useFollowUnFollowMutation,
} = productsApi;
