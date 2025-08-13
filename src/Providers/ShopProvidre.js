import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { API, base_url, ERROR, LOADING } from "./index";
export const ShopContext = React.createContext();
const ShopProvider = ({ children }) => {
  const [YourCartListData, setYourCartListData] = useState("");
  const [AddressDetailsData, setAddressDetailData] = useState("");
  const [CountryListData, setCountryListData] = useState("");
  const [StateListData, setStateListData] = useState("");
  const [CheckoutDetail, setCheckoutDetail] = useState("");
  const [ConfirmOrderData, setConfirmOrderData] = useState("");
  const [increase, setincrease] = useState({
    amuont: "",
    state: false,
    count: 0,
  });
  const [decrease, setdecrease] = useState({
    amuont: "",
    state: false,
    count: 0,
  });
  const [countData, setcountData] = useState(1);
  const [count, setCount] = useState(1);
  const [loadercount, setloadercount] = useState(false);
  const API_Shop = {
    YourCartList: async (params, onSuccess) =>
      await API.post("user/cart-list", params).then((res) => {
        setYourCartListData(res.data.data);
      }),
    ShippingAddressDetail: async (params, onSuccess) =>
      await API.post("user/detailOfShippingAddress", params).then((res) => {
        setAddressDetailData(res.data),
          console.log(res.data, "Address Detail list_____");
      }),
    CountryDetail: async (params, onSuccess) =>
      await API.get("getCountry", params).then((res) => {
        setCountryListData(res.data);
      }),
    StateDetail: async (params, onSuccess) =>
      await API.get("getStates", params).then((res) => {
        setStateListData(res.data);
      }),
    CheckOutDetail: async (params, onSuccess) =>
      await API.post("user/check-detail", params).then((res) => {
        setCheckoutDetail(res?.data),
          console.log(res.data, "setCheckoutDetail  list_____");
      }),
    // CartDelete : async (params,onSuccess) => await API.delete('user/delete-prod-cart', params).then(res => { console.log(res.data , "setCheckoutDetail  list_____")}),
    DeleteItemCart: async (params, onSuccess) =>
      await API.post("user/delete-prod-cart", params).then((res) => {
        Alert.alert(res.data.message);
      }),
    ConfirmOrder: async (params, onSuccess) =>
      await API.post("user/create-order", params).then((res) => {
        setConfirmOrderData(res.data),
          console.log(res.data, "setConfirm ++++++++======>");
      }),
  };

  return (
    <ShopContext.Provider
      value={{
        API_Shop,
        YourCartListData,
        setYourCartListData,
        AddressDetailsData,
        setAddressDetailData,
        CountryListData,
        setCountryListData,
        StateListData,
        setStateListData,
        CheckoutDetail,
        setCheckoutDetail,
        ConfirmOrderData,
        setConfirmOrderData,
        increase,
        setincrease,
        decrease,
        setdecrease,
        countData,
        setcountData,
        count,
        setCount,
        loadercount,
        setloadercount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
