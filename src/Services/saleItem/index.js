import {LIMIT, productStatus, ReducerPath} from '../../Constant';
import {api, baseUrl} from '../api.service';
import {productsApi} from '../products';

const saleItemInstance = ReducerPath.saleItems;
const productPagination = (currentCache, newItems, arg) => {
  if (arg?.page === 1) {
    return newItems;
  }
  const currentProducts = currentCache?.data?.products || [];
  const newProducts = newItems?.data?.products || [];
  return {
    ...currentCache,
    data: {
      ...currentCache.data,
      products: [...currentProducts, ...newProducts],
      hasMore: newItems?.data?.hasMore,
    },
    message: newItems.message || currentCache.message,
    status: newItems.status || currentCache.status,
  };
};
const transformProductResponse = response => {
  const hasMore = response?.data?.products.length === LIMIT;
  return {
    ...response,
    data: {
      ...response.data,
      hasMore, // Add hasMore flag to the data object
    },
  };
};

export const saleItemsApi = api(saleItemInstance).injectEndpoints({
  endpoints: build => ({
    getSellerProducts: build.query({
      query: body => {
        return {
          url: `${baseUrl}seller/productList`,
          method: 'POST',
          body,
        };
      },
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems, {arg}) => {
        return productPagination(currentCache, newItems, arg);
      },
      forceRefetch({currentArg, previousArg}) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.user_id !== previousArg?.user_id
        ); // Refetch only if the page changes
      },
      transformResponse: transformProductResponse,
    }),

    getSellerDraftProducts: build.query({
      query: body => {
        return {
          url: `${baseUrl}seller/productList`,
          method: 'POST',
          body,
        };
      },
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg?.page !== previousArg?.page; // Refetch only if the page changes
      },
      merge: (currentCache, newItems, {arg}) => {
        return productPagination(currentCache, newItems, arg);
      },
      transformResponse: transformProductResponse,
    }),
    addProduct: build.mutation({
      query: data => {
        const {formData} = data;
        return {
          url: `${baseUrl}seller/createproduct`,
          method: 'POST',
          body: formData,
        };
      },
      onQueryStarted: async (data, {dispatch, queryFulfilled}) => {
        try {
          const {data: mutationResponse} = await queryFulfilled;
          if (mutationResponse?.data) {
            const newProduct = mutationResponse.data; // Assuming the response contains the created product
            const targetQuery =
              data?.status === productStatus.Draft
                ? 'getSellerDraftProducts'
                : 'getSellerProducts';

            dispatch(
              saleItemsApi.util.updateQueryData(
                targetQuery,
                undefined,
                draft => {
                  if (draft?.data?.products) {
                    draft.data.products.unshift(newProduct); // Add the new product to the top
                  } else {
                    draft.data = {products: [newProduct]};
                  }
                },
              ),
            );
          }
        } catch (error) {
          console.error('Error adding product:', error);
        }
      },
    }),
    editProduct: build.mutation({
      query: data => {
        const {formData} = data;
        return {
          url: `${baseUrl}seller/productupdate`,
          method: 'POST',
          body: formData,
        };
      },
      onQueryStarted: async (data, {dispatch, queryFulfilled}) => {
        try {
          const {data: mutationResponse} = await queryFulfilled;

          if (mutationResponse?.data) {
            const updatedProduct = mutationResponse.data; // Updated product from the response
            const currentCache =
              data?.currentStatus === productStatus.Draft
                ? 'getSellerDraftProducts'
                : 'getSellerProducts';
            const updatedCache =
              data?.status === productStatus.Draft
                ? 'getSellerDraftProducts'
                : 'getSellerProducts';
            if (currentCache === updatedCache) {
              // Update the product in the current cache
              dispatch(
                saleItemsApi.util.updateQueryData(
                  currentCache,
                  undefined,
                  draft => {
                    if (draft?.data?.products) {
                      const productIndex = draft.data.products.findIndex(
                        product => product.id === updatedProduct.id,
                      );
                      if (productIndex >= -1) {
                        draft.data.products[productIndex] = updatedProduct; // Update the product in place
                      }
                    }
                  },
                ),
              );
            } else {
              // Remove the product from the current cache
              dispatch(
                saleItemsApi.util.updateQueryData(
                  currentCache,
                  undefined,
                  draft => {
                    if (draft?.data?.products) {
                      draft.data.products = draft.data.products.filter(
                        product => product.id !== updatedProduct.id,
                      );
                    }
                  },
                ),
              );
              // Add the product to the updated cache
              dispatch(
                saleItemsApi.util.updateQueryData(
                  updatedCache,
                  undefined,
                  draft => {
                    if (draft?.data?.products) {
                      draft.data.products.unshift(updatedProduct); // Add the product to the top
                    } else {
                      draft.data = {products: [updatedProduct]};
                    }
                  },
                ),
              );
            }
            dispatch(
              productsApi.util.updateQueryData(
                'getProducts',
                undefined,
                draft => {
                  if (draft?.data?.products) {
                    const productIndex = draft.data.products.findIndex(
                      product => product.id === updatedProduct.id,
                    );
                    if (productIndex !== -1) {
                      draft.data.products[productIndex] = updatedProduct;
                    }
                  }
                },
              ),
            );
          }
        } catch (error) {
          console.error('Error updating product:', error);
        }
      },
    }),

    deleteProduct: build.mutation({
      query: data => {
        const {id = ''} = data;
        return {
          url: `${baseUrl}seller/productdelete`,
          method: 'POST',
          body: {product_id: id},
        };
      },
      onQueryStarted: async (data, {dispatch, queryFulfilled}) => {
        try {
          await queryFulfilled;
          const targetQuery =
            data?.status === productStatus.Draft
              ? 'getSellerDraftProducts'
              : 'getSellerProducts';
          dispatch(
            saleItemsApi.util.updateQueryData(
              targetQuery,
              undefined, // Match serializeQueryArgs setup
              draft => {
                if (draft?.data?.products) {
                  // Find the product in the draft cache
                  const productIndex = draft.data.products.findIndex(
                    product => product.id === data.id,
                  );

                  if (productIndex !== -1) {
                    // Update the product's status
                    draft.data.products.splice(
                      productIndex,
                      1, // Remove the product from the draft cache
                    );
                  }
                }
              },
            ),
          );
          dispatch(
            productsApi.util.updateQueryData(
              'getProducts',
              undefined,
              draft => {
                if (draft?.data?.products) {
                  const productIndex = draft.data.products.findIndex(
                    product => product.id === data.id,
                  );
                  if (productIndex !== -1) {
                    draft.data.products.splice(productIndex, 1);
                  }
                }
              },
            ),
          );
        } catch (error) {
          console.error('Error updating seller products:', error);
        }
      },
    }),
    publishProduct: build.mutation({
      query: data => {
        const {id} = data;
        return {
          url: `${baseUrl}seller/prod-publish-unpublish`,
          method: 'PATCH',
          body: {product_id: id},
        };
      },
      onQueryStarted: async (data, {dispatch, queryFulfilled}) => {
        try {
          const {data: mutationResponse} = await queryFulfilled;
          if (data?.status === productStatus.Draft) {
            dispatch(
              saleItemsApi.util.updateQueryData(
                'getSellerDraftProducts',
                undefined, // Match serializeQueryArgs setup
                draft => {
                  if (draft?.data?.products) {
                    // Find the product in the draft cache
                    const productIndex = draft.data.products.findIndex(
                      product => product.id === data.id,
                    );

                    if (productIndex !== -1) {
                      // Update the product's status
                      const [updatedProduct] = draft.data.products.splice(
                        productIndex,
                        1, // Remove the product from the draft cache
                      );

                      updatedProduct.status =
                        mutationResponse?.newStatus || productStatus.Published;

                      // Second dispatch: Add the updated product to the published products cache
                      dispatch(
                        saleItemsApi.util.updateQueryData(
                          'getSellerProducts',
                          undefined, // Match serializeQueryArgs setup
                          publishedDraft => {
                            if (publishedDraft?.data?.products) {
                              publishedDraft.data.products.unshift(
                                updatedProduct,
                              ); // Add to the beginning of the published products cache
                            } else {
                              console.warn(
                                'Published products cache is empty. Initializing...',
                              );
                              publishedDraft.data = {
                                products: [updatedProduct],
                              };
                            }
                          },
                        ),
                      );
                      dispatch(
                        productsApi.util.updateQueryData(
                          'getProducts',
                          undefined,
                          draft => {
                            if (draft?.data?.products) {
                              draft.data.products.push(updatedProduct);
                            } else {
                              draft.data = {
                                products: [updatedProduct],
                              };
                            }
                          },
                        ),
                      );
                    } else {
                      console.warn('Product not found in draft cache.');
                    }
                  } else {
                    console.warn('No products found in draft cache.');
                  }
                },
              ),
            );
          } else {
            dispatch(
              saleItemsApi.util.updateQueryData(
                'getSellerProducts',
                undefined,
                draft => {
                  if (draft?.data) {
                    const productIndex = draft.data.products.findIndex(
                      product => product.id === data.id,
                    );
                    if (productIndex !== -1) {
                      const [updatedProduct] = draft.data.products.splice(
                        productIndex,
                        1,
                      );

                      updatedProduct.status =
                        mutationResponse?.newStatus || productStatus.Draft;

                      dispatch(
                        saleItemsApi.util.updateQueryData(
                          'getSellerDraftProducts',
                          undefined,
                          publishedDraft => {
                            if (publishedDraft?.data?.products) {
                              publishedDraft.data.products.unshift(
                                updatedProduct,
                              );
                            } else {
                              publishedDraft.data = {
                                products: [updatedProduct],
                              };
                            }
                          },
                        ),
                      );
                      dispatch(
                        productsApi.util.updateQueryData(
                          'getProducts',
                          undefined,
                          draft => {
                            if (draft?.data?.products) {
                              const productIndex =
                                draft.data.products.findIndex(
                                  product => product.id === data.id,
                                );
                              if (productIndex !== -1) {
                                draft.data.products.splice(productIndex, 1);
                              }
                            }
                          },
                        ),
                      );
                    }
                  }
                },
              ),
            );
          }
        } catch (error) {
          console.error('Error updating seller products:', error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSellerProductsQuery,
  useGetSellerDraftProductsQuery,
  useAddProductMutation,
  usePublishProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
} = saleItemsApi;
