

import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CounterSmall from '../Components/CounterSmall'
import { hp, wp } from './Config'
import { Image_URL } from '../Providers'
import { HomeContext } from '../Providers/HomeProvider'
import { ShopContext } from '../Providers/ShopProvidre'
import { useNavigation } from '@react-navigation/native'
const YourCartComponent = ({ textone, texttwo, textthree, third, image, data, item, checkout, onPress, id, instock, favorite }) => {
 
  const [count, setCount] = useState(item?.quantity)

  const { API_HOME } = useContext(HomeContext);
  const { API_Shop,increase, setincrease, decrease, setdecrease } = useContext(ShopContext);
  const [show, setShow] = useState(false)
  const navigation = useNavigation()
  const CartDelete = useLoadingFn(API_Shop.DeleteItemCart)
  const AddFavorite = useLoadingFn(API_HOME.AddFavorite);
  const ProductDetails = useLoadingFn(API_HOME.ProductDetails);
  const YourCartList = useLoadingFn(API_Shop.YourCartList);
  const OnProductDetail = (data) => {
    ProductDetails({ params: { product_id: data?.productDetail?._id }, onSuccess: () => { navigation.navigate('ItemDetails', { data }) }, })
  }
// useEffect(() => {

//   setCount(item?.quantity)
// }, [])


  const OnCartProductDetail = (item) => {
  
    ProductDetails({ params: { product_id: item?.productDetail?._id }, onSuccess: () => { navigation.navigate('ItemDetails', { item }) }, })
  }
  const Delete = (item) => {

    Alert.alert('Alert', 'Are you sure you want to Delete this Product ?', [
      {
        text: 'NO',
        onPress: () => setShow(false),
        style: 'cancel',
      },
      {
        text: 'YES', onPress: () => {
          CartDelete({ params: { product_cart_id: item?._id }, onSuccess: () => {  YourCartList({ params: {}, onSuccess: () => { }, })}, })
        },
      },
    ]);
  }
  console.log(textthree,'textthreetextthreetextthree')
  return (
    <TouchableOpacity style={styles.mainView} onPress={() => { checkout ? OnCartProductDetail(item) : OnProductDetail(data) }} >
      <View style={styles.innerView}>
        <Image style={styles.imageStyle} source={favorite ? { uri: Image_URL + image } : image} />
        <View>
          <Text style={styles.textone}>{textone}</Text>
          <Text style={styles.texttwo}>{texttwo}</Text>
          <Text style={styles.textthree}>{`$ ${textthree}`}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: '500', fontSize: 11, color: '#046102', marginTop: 6, marginRight: 15 }}>{true ? 'In stock' : 'Out of stock'}</Text>
            <TouchableOpacity onPress={() =>  Delete(item) }>
              <Text style={{ fontWeight: '500', fontSize: 11, color: '#D94928', marginTop: 6 }}>{'Delete'}</Text>
            </TouchableOpacity>
          </View>
        </View>
          <TouchableOpacity style={{ height: hp(8), alignItems: "center", justifyContent: "center"}} pointerEvents='none'>
            <CounterSmall count={count} setcount={setCount} amount={textthree} item={item} />
          </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default YourCartComponent

const styles = StyleSheet.create({
  mainView: {
    width: wp(90),
    height: hp(14),
    backgroundColor: '#F8F8FB',
    alignSelf: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    marginBottom: 20

  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // height:hp(8),
    width: wp(90),
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  textone: {
    fontWeight: '400',
    fontSize: 11,
    color: '#B1B1B1'
  },
  texttwo: {
    fontWeight: '500',
    fontSize: 12,
    color: '#494949'
  },
  textthree: {
    fontWeight: '500',
    fontSize: 15,
    color: '#56AB2F',
    marginTop: 6
  },
  imageStyle: {
    width: 65,
    height: 65,
  }

})
