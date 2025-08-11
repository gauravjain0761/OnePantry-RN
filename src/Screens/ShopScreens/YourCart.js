import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import BackComponent from '../../Components/BackComponent';
import {IMAGE, COLORS} from '../../Constant/Images';
import YourCartComponent from '../../Components/YourCartComponent';
import Button from '../../Components/Button';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {hp, wp} from '../../Components/Config';
import {ShopContext} from '../../Providers/ShopProvidre';
import {Image_URL} from '../../Providers';
import {ScrollView} from 'react-native-gesture-handler';
import {SuccessPopup} from '../../Components/AlertPopup';
import {AppContext} from '../../Providers/AppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const YourCart = () => {
  const navigation = useNavigation();
  const {
    API_Shop,
    YourCartListData,
    increase,
    setincrease,
    decrease,
    setdecrease,
    loadercount,
    setloadercount,
  } = useContext(ShopContext);
  const YourCartList = useLoadingFn(API_Shop.YourCartList);
  const CheckOutDetail = useLoadingFn(API_Shop.CheckOutDetail);
  const isFocused = useIsFocused();
  const [count, setcount] = useState(1);
  const [loader, setLoader] = useState(false);


  useEffect(() => {
    setLoader(true);
    YourCartList({
      params: {},
      onSuccess: () => {
        setLoader(false);
      },
    });
  }, [isFocused]);

  const [data, setData] = useState([]);

  let total = isNaN(data[data?.length - 1]?.finalPrice)
    ? 0
    : parseInt(data[data?.length - 1]?.finalPrice);
  //  console.log(data[data?.length - 1]?.finalPrice,"zzzzzzzzzzzzzzzzzzzzzz");
  const {ActiveSuccessPopup, setActiveErrorPopup, ActiveErrorPopup} =
    useContext(AppContext);
  const [t, sett] = useState(0);
  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem('count', `${YourCartListData.length}`);
    })();
    if (Array.isArray(YourCartListData) && YourCartListData.length > 0) {
      setData(YourCartListData);
    }
  }, [YourCartListData]);

  useEffect(() => {
    if (data.length > 0) {
      const total = parseInt(data[data.length - 1]?.finalPrice);
      sett(total);
    }
  }, [data]);
  useEffect(() => {
    sett(
      decrease.state && t > 0
        ? t - decrease.amount
        : increase.state && t > 0
        ? +(t + increase.amount)
        : t,
    );
  }, [increase.count, decrease.count]);

  const OnCheckout = () => {
    setLoader(true);
    CheckOutDetail({
      params: {},
      onSuccess: () => {
        setLoader(false), navigation.navigate('CheckOut');
      },
    });
  };
  const backToHome = () => {
    navigation.navigate('Homes');
  };

  // console.log(YourCartListData,'YourCartListDataYourCartListData',total,decrease.amount,increase.amount,decrease.state,increase.state)

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <BackComponent text={'Your Cart'} />
      {YourCartListData.length == 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image
            source={IMAGE.EmptyCart}
            resizeMode="contain"
            style={{width: 102, height: 108, marginTop: 20}}
          />
          <Text
            style={{
              color: '#495765',
              fontSize: 21,
              fontWeight: 600,
              marginTop: 18,
            }}>
            {'No items here'}
          </Text>
          <Text style={{color: 'grey', fontSize: 15, marginTop: 4}}>
            {'Your One Pantry Cart is Empty'}
          </Text>
          <Button
            title={'Back To Home'}
            style={{
              marginTop: 35,
              backgroundColor: COLORS.Green,
              borderRadius: 32,
              alignSelf: 'center',
              marginBottom: 50,
              width: wp(45),
            }}
            color={{color: '#fff'}}
            onPress={backToHome}
          />
        </View>
      ) : (
        <ScrollView style={{padding: 20}}>
          {loader ? <ActivityIndicator color={COLORS.Green} /> : null}
          {loadercount ? <ActivityIndicator color={COLORS.Green} /> : null}
          {data &&
            data?.length > 0 &&
            data?.map((item, index) => {
              if (index == data?.length - 1) return null;

              return (
                <YourCartComponent
                  checkout
                  item={item}
                  image={{
                    uri: Image_URL + item?.productDetail?.product_img[0]?.image,
                  }}
                  textone={item?.productDetail?.category_id?.category_name}
                  texttwo={item?.productDetail?.name}
                  textthree={item?.productDetail?.selling_price}
                  count={count}
                  setcount={setcount}
                  key={index.toString()}
                />
              );
            })}
          <Text
            style={{
              fontWeight: '600',
              fontSize: 20,
              color: '#000000B2',
              textAlign: 'right',
              marginRight: 20,
            }}>
            Total:{' '}
            <Text
              style={{fontWeight: '600', fontSize: 20, color: '#56AB2F'}}>{`$ ${
              t == 0 ? data[data?.length - 1]?.finalPrice ?? 0 : t
            }`}</Text>
          </Text>
          <Button
            title={'Checkout'}
            style={{
              marginTop: 35,
              backgroundColor: COLORS.Green,
              borderRadius: 15,
              alignSelf: 'center',
              marginBottom: 50,
              width: wp(45),
            }}
            color={{color: '#fff'}}
            onPress={OnCheckout}
          />
        </ScrollView>
      )}
      <SuccessPopup />
    </View>
  );
};

export default YourCart;
