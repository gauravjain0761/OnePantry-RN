import {Collections, ReducerPath} from '../../Constant';
import {api, baseUrl, fakeApi} from '../api.service';
import {getDocument} from '../fireStoreMethods';

export const categoriesApi = api(ReducerPath.categoriesApi).injectEndpoints({
  endpoints: build => ({
    getCategories: build.query({
      query: () => {
        return {
          url: `${baseUrl}user/home-screen-cat-list`,
          method: 'POST',
        };
      },
    }),
    getSubCategories: build.mutation({
      query: body => {
        return {
          url: `${baseUrl}seller/subcategory-list-without-pagination`,
          method: 'POST',
          body,
        };
      },
    }),
    getCategory: build.query({
      query: () => {
        return {
          url: `${baseUrl}user/home-screen-cat-list`,
          method: 'POST',
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const categoryFakeApi = fakeApi(
  ReducerPath.categoriesFakeApi,
).injectEndpoints({
  endpoints: build => ({
    getCategory: build.query({
      async queryFn(data) {
        const {docId = ''} = data;
        try {
          if (!docId) {
            throw new Error('Document ID (docId) is required.');
          }
          const document = await getDocument(Collections.categories, [], docId);
          return {data: document};
        } catch (error) {
          // Handle and return the error
          const errorMessage = error.message || 'An unknown error occurred.';
          return {error: {message: errorMessage}};
        }
      },
    }),
  }),
  overrideExisting: false,
});
export const {useGetCategoriesQuery, useGetSubCategoriesMutation} =
  categoriesApi;
export const {useGetCategoryQuery} = categoryFakeApi;
