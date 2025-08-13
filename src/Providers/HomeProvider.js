import React, { useState } from "react";
import { API } from "./index";
import { authMiddleware } from "./AuthMiddleware"; // Import the auth middleware

export const HomeContext = React.createContext();
const HomeProvider = ({ children }) => {
  const [Productlist, setProductlist] = useState("");
  const [CatList, setCatList] = useState("");
  const [ProductDtl, setProductDtl] = useState("");
  const [FavoriteData, setFavoriteData] = useState("");
  const [Favoritelist, setFavoritelist] = useState("");
  const [searchData, setsearchData] = useState("");
  const [addressList, setaddressList] = useState("");

  const API_HOME = {
    ProductList: async (params, onSuccess) => {
      console.log("PRODUCT LIST FUNCTION");
      try {
        const data = await authMiddleware(
          "user/home-screen-prod-list",
          params,
          "POST"
        );
        console.log("Data received:", data);

        const products = data.data.products; // Adjust based on your actual response structure
        setProductlist(products);

        if (onSuccess) onSuccess(data); // Call the onSuccess callback if provided
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    },

    CategoriesList: async (params, onSuccess) => {
      console.log("CATEGORIES LIST FUNCTION", params);
      try {
        const data = await authMiddleware(
          "user/home-screen-cat-list",
          params,
          "POST"
        );
        console.log("Data received:", data);

        setCatList(data.data.search_data);
        if (onSuccess) onSuccess(data); // Call the onSuccess callback if provided
      } catch (error) {
        console.error("Error fetching categories list:", error);
      }
    },

    ProductDetails: async (params, onSuccess) => {
      try {
        const data = await authMiddleware(
          "user/home-screen-prod-detail",
          params,
          "POST"
        );
        setProductDtl(data.data.productData);
        if (onSuccess) onSuccess(data); // Call the onSuccess callback if provided
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },
    AddFavorite: async (params, onSuccess) =>
      await API.post("user/add-favorite", params).then((res) => {
        setFavoriteData(res.data.data);
      }),
    FavoriteList: async (params, onSuccess) =>
      await API.post("user/list-favorite", params).then((res) => {
        setFavoritelist(res.data.data),
          console.log(res.data.data, "oooooooooooo");
      }),
    AddToCart: async (params, onSuccess) =>
      await API.post("user/add-to-cart", params)
        .then((res) => {
          console.log("AddToCart res ", res.data);
        })
        .catch((error) => {
          console.log("params", params);
          console.log("AddToCart error ", error);
        }),
    HomeSearching: async (params, onSuccess) =>
      await API.post("user/home-screen-searching", params).then((res) => {
        setsearchData(res.data), console.log("res is", res.data);
      }),
    AddressSearching: async (params, onSuccess) =>
      await API.get("user/listShippingAddress", params).then((res) => {
        setaddressList(res.data), console.log("address is", res.data);
      }),
  };

  return (
    <HomeContext.Provider
      value={{
        API_HOME,
        Productlist,
        setProductlist,
        CatList,
        setCatList,
        ProductDtl,
        setProductDtl,
        FavoriteData,
        setFavoriteData,
        Favoritelist,
        setFavoritelist,
        searchData,
        setsearchData,
        addressList,
        setaddressList,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
