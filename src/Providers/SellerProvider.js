import React, {useState} from 'react';
import {API} from './index';
import {authMiddleware} from './AuthMiddleware'; // Import the auth middleware
export const SellerContext = React.createContext();

const SellerProvider = ({children}) => {
  const [CategoryList, setCategoryList] = useState([]);
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [CategoryID, setCategoryID] = useState([]);
  const [productlistseller, setproductlistseller] = useState([]);
  const [sellerlist, setsellerlist] = useState([]);
  const [sellerdraftlist, setsellerdraftlist] = useState([]);
  const [catValue_id, setcatValue_id] = useState('');
  const [countryData, setcountryData] = useState([]);
  const [stateData, setstateData] = useState([]);
  const [addressList, setaddressList] = useState([]);

  const API_SELLER = {
    CategoryList: async (params, onSuccess) => {
      console.log('CATEGORY LIST FUNCTION');
      try {
        const data = await authMiddleware(
          'user/home-screen-cat-list',
          params,
          'POST',
        );
        console.log('Data received:', data);
        setCategoryList(data.data.data);
        if (onSuccess) onSuccess(data); // Call the onSuccess callback if provided
      } catch (error) {
        console.error('Error fetching category list:', error);
      }
    },
    SubCategoryList: async (params, onSuccess) => {
      console.log('SUB CATEGORY LIST FUNCTION');
      try {
        const data = await authMiddleware(
          'seller/subcategory-list-without-pagination',
          params,
          'POST',
        );
        console.log('Data received:', data);
        setSubCategoryList(data.data.data);
        if (onSuccess) onSuccess(data); // Call the onSuccess callback if provided
      } catch (error) {
        console.error('Error fetching subcategory list:', error);
      }
    },
    Additem: async (params, onSuccess) =>
      await API.post('seller/createproduct', params).then(res => {
        console.log(res.data);
      }),
    updateItem: async (params, onSuccess) => {
      console.log('Updating item with params:', params);
      try {
        const response = await authMiddleware(
          'seller/productupdate',
          params,
          'POST',
        );
        console.log('Update response:', response.data);
        if (onSuccess) onSuccess(response.data); // Call the onSuccess callback if provided
        return response.data; // Return the response data if needed
      } catch (error) {
        console.error('Error updating item:', error);
        throw error; // Optionally re-throw the error for further handling
      }
    },
    SellerProductList: async (params, onSuccess) => {
      try {
        const data = await authMiddleware('seller/productList', params, 'POST');
        console.log('Data received:', data);
        setsellerlist(data.data);
        if (onSuccess) onSuccess(data); // Call the onSuccess callback if provided
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    },
    SellerDraftProductList: async (params, onSuccess) => {
      try {
        const data = await authMiddleware('seller/productList', params, 'POST');
        setsellerdraftlist(data.data);
        if (onSuccess) onSuccess(data); // Call the onSuccess callback if provided
      } catch (error) {
        console.error('Error fetching draft product list:', error);
      }
    },

    Publish: async (params, onSuccess) => {
      console.log('PUBLISH FUNCTION');
      try {
        const data = await authMiddleware(
          'seller/prod-publish-unpublish',
          params,
          'PATCH',
        );
        console.log('Data received:', data);
        if (onSuccess) onSuccess(data); // Call the onSuccess callback if provided
      } catch (error) {
        console.error('Error publishing product:', error);
      }
    },

    DeleteItem: async (params, onSuccess) => {
      console.log('DELETE PRODUCT LIST FUNCTION');
      try {
        const data = await authMiddleware(
          'seller/productdelete',
          params,
          'POST',
        );
        console.log('Data received:', data);
        if (onSuccess) onSuccess(data); // Call the onSuccess callback if provided
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    CountryList: async (params, onSuccess) =>
      await API.get('getCountry', params).then(res => {
        console.log(res.data), setcountryData(res.data.data);
      }),
    StateList: async (params, onSuccess) =>
      await API.post('getStates', params).then(res => {
        console.log(res.data), setstateData(res.data.data);
      }),
    Addaddress: async (params, onSuccess) =>
      await API.post('user/addShippingAddress', params).then(res => {
        console.log(res.data, 'address of the user/seller is recieved');
      }),
    Addaddresslist: async (params, onSuccess) =>
      await API.post('user/listShippingAddress', params).then(res => {
        setaddressList(res.data.data);
      }),
    EditAddress: async (params, onSuccess) =>
      await API.put('user/editSippingAddress', params).then(res => {}),
    DeleteAddress: async (params, onSuccess) =>
      await API.patch('user/deleteShippingAddress', params).then(res => {
        console.log(res.data.data);
      }),
    SelectAddress: async (params, onSuccess) =>
      await API.patch('user/set-default-shiping', params).then(res => {
        console.log(res.data.data);
      }),
  };

  return (
    <SellerContext.Provider
      value={{
        API_SELLER,
        CategoryList,
        setCategoryList,
        SubCategoryList,
        setSubCategoryList,
        productlistseller,
        setproductlistseller,
        sellerlist,
        setsellerlist,
        catValue_id,
        setcatValue_id,
        countryData,
        setcountryData,
        stateData,
        setstateData,
        addressList,
        setaddressList,
        sellerdraftlist,
        setsellerdraftlist,
      }}>
      {children}
    </SellerContext.Provider>
  );
};

export default SellerProvider;
