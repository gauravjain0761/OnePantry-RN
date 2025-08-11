import { View, Text, Image, StyleSheet, TouchableOpacity, Alert ,ActivityIndicator} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { hp, wp } from './Config'
import { Image_URL } from '../Providers'
import { HomeContext } from '../Providers/HomeProvider'
import { ShopContext } from '../Providers/ShopProvidre'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../Providers/AppProvider'
import { COLORS } from '../Constant/Images'
const FavoriteCartComponent = ({ textone, texttwo, textthree, third, image, count, setcount, data, item, checkout, onPress, id, instock, favorite }) => {
  console.log("data recieved ___________", data)
  console.log("item is  recieved ___________", data)

  const { API_HOME } = useContext(HomeContext);
  const { API_Shop } = useContext(ShopContext);
  const { commonLoaderFv, setcommonLoaderFv} = useContext(AppContext)
  const [show, setShow] = useState(false)
  const navigation = useNavigation()
  const AddFavorite = useLoadingFn(API_HOME.AddFavorite);
  const ProductDetails = useLoadingFn(API_HOME.ProductDetails);

  const ProductList = useLoadingFn(API_HOME.ProductList);
  const FavoriteList = useLoadingFn(API_HOME.FavoriteList);
const [loader, setloader] = useState(false)
  const OnProductDetail = (data) => {
    console.log(data.productDetail._id, 'data item ________________=====')
    ProductDetails({ params: { product_id: data?.productDetail?._id }, onSuccess: () => { navigation.navigate('ItemDetails', { data }) }, })
  }

  const OnCartProductDetail = (item) => {
    console.log(item.p_id, 'item ________________=====')
    ProductDetails({ params: { product_id: item?.productDetail?._id }, onSuccess: () => { navigation.navigate('ItemDetails', { item }) }, })
  }
  const Delete = () => {

    Alert.alert('Alert', 'Are you sure you want to Delete this Product ?', [
      {
        text: 'NO',
        onPress: () => setShow(false),
        style: 'cancel',
      },
      {
        text: 'YES', onPress: () => {
          AddFavorite({ params: { product_id: id }, onSuccess: () => {setcommonLoaderFv(true), FavoriteList({ params: {}, onSuccess: () => {setcommonLoaderFv(false) }, }) } })
         
            // navigation.navigate("Homes")
        }
      },

    ]);

    //  useEffect(() => {
    //   ProductList({ params: {}, onSuccess: () => {},}) 
    //  }, [])


  }
  return (
    <TouchableOpacity  style={styles.mainView} onPress={() => { checkout ? OnCartProductDetail(item) : OnProductDetail(data) }}>
      <View style={styles.innerView}>
        <LinearGradient colors={['#F2F2F2', '#FFFFFF', '#F2F2F2']} style={styles.LinearGradientStyle}>
          <Image style={styles.imageStyle} source={favorite ? { uri: Image_URL + image } : image} />
        </LinearGradient>
        <View style={{ paddingLeft: 30, marginTop: 5 }}>
          <Text style={styles.textone}>{textone}</Text>
          <Text numberOfLines={1} style={styles.texttwo}>{texttwo.length> 25 ? `${texttwo.substring(0,25)}.....`: texttwo} </Text>
          <Text style={styles.textthree}>{"$"} {textthree}</Text>
          <TouchableOpacity onPress={Delete} style={{ backgroundColor: "#D94928", width: 57, height: 23, justifyContent: "center", marginTop: 8, alignItems: "center", borderRadius: 18 }}>
            <Text style={{ fontWeight: '500', fontSize: 11, color: '#fff', textAlign: "center" }}>{'Delete'}</Text>
          </TouchableOpacity>
        </View>

{/* {loader ? <ActivityIndicator color={COLORS.Green}/> : null} */}
      </View>

    </TouchableOpacity>
  )
}

export default FavoriteCartComponent
const styles = StyleSheet.create({
  mainView: {
    width: wp(90),
    height: hp(18),
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#56AB2F",
    elevation:2
  },
  innerView: {
    flexDirection: 'row',
    // alignItems:'flex-end',
    // backgroundColor:20,
    height: hp(14),
    width: wp(90),
    // justifyContent:'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  textone: {
    fontWeight: '400',
    fontSize: 11,
    color: '#B1B1B1',

  },
  texttwo: {
    fontWeight: '500',
    fontSize: 12,
    color: '#494949',
    marginTop: 4

  },
  textthree: {
    fontWeight: '500',
    fontSize: 15,
    color: '#56AB2F',
    marginTop: 4

  },
  imageStyle: {
    width: 75,
    height: 75,
  },

  LinearGradientStyle: {
    height: hp(15),
    width: wp(30),
    alignSelf: 'center',
    justifyContent: "center",
    borderRadius: 16,
    paddingLeft: 18
  }

})
