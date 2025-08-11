



// import { ScrollView } from 'react-native-gesture-handler'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { IMAGE, COLORS, TEXT } from '../../Constant/Images/index'
import { useNavigation } from '@react-navigation/native';
import BackComponent from '../../Components/BackComponent';
import { hp, wp } from '../../Components/Config';
import { useForm } from 'react-hook-form';
import { HomeContext } from '../../Providers/HomeProvider';
import { Image_URL } from '../../Providers';
import Button from '../../Components/Button'
import EditProfileBlock from '../../Components/EditProfileBlock'
import { AuthContext } from '../../Providers/AuthProvider'
import RatingCard from '../../Components/RatingCard'
const { width, height } = Dimensions.get('window');

const SellerDetail = () => {
  const { userDetail, API_CALL, Login } = useContext(AuthContext);
  const [follow, setfollow] = useState(false)
  const [firstname, setFirstname] = useState(userDetail?.result?.first_name)
  const [lastname, setLastname] = useState(userDetail?.result?.last_name)
  const [email, setemail] = useState(userDetail?.result?.email)
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { API_HOME, searchData, setsearchData, Productlist } = useContext(HomeContext);
  const HomeSearching = useLoadingFn(API_HOME.HomeSearching);
  const ProductList = useLoadingFn(API_HOME.ProductList);
  const ProductDetails = useLoadingFn(API_HOME.ProductDetails);
  const navigation = useNavigation()


  const OnProductDetail = (item) => {
    console.log(item?._id, 'data item ____+++++++++++++____________=====')
    ProductDetails({ params: { product_id: item._id }, onSuccess: () => { navigation.navigate('ItemDetails', { item }) }, })
  }
  useEffect(() => {
    ProductList({ params: { filter_type: 'Dsc' }, onSuccess: () => { }, })
  }, [])
  console.log(Productlist, 'ProductlistProductlist')
  const renderList = ({ item }) => {
    console.log("view all listing item recieved============+>", item)
    return (

      <View style={styles.card}>
        <TouchableOpacity onPress={() => OnProductDetail(item)}>
          <Image source={{ uri: Image_URL + item.product_img[0]?.image }} resizeMode='contain' style={{ alignSelf: 'center', marginVertical: 15, height: 85, width: 85 }} />
        </TouchableOpacity>
        <View>
          <Text style={{ fontWeight: '500', fontSize: 10, color: COLORS.Black, opacity: .5 }}>{item.name}</Text>
          <Text style={{ fontWeight: '400', fontSize: 6, color: COLORS.Black, opacity: .5 }}>{item.description}</Text>
          <View>
            <Text style={{ fontWeight: '500', fontSize: 14, color: COLORS.Green, position: 'absolute', bottom: 0, right: 10 }}>{'$' + item.selling_price}</Text>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <BackComponent text={userDetail?.result?.first_name} />
      <View>
        <Image style={{ width: wp(100), height: hp(20) }} source={IMAGE.manprofile} resizeMode='cover' />
        <Image style={{ width: 100, height: 100, position: 'absolute', borderRadius: 55, borderWidth: 3, borderColor: '#fff', bottom: 30, left: 20 }} source={IMAGE.manbackground} resizeMode='cover' />

        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>

          <Button title={!follow ? 'Follow' : 'Unfollow'} style={{ marginTop: 15, backgroundColor: !follow ? COLORS.Green : 'grey', borderRadius: 15, marginBottom: 40, width: wp(25), height: hp(3.4), marginRight: 20 }} color={{ color: '#fff', fontSize: 11, fontWeight: '500' }} onPress={() => setfollow(!follow)} />

        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View >

          <EditProfileBlock name={firstname} setname={setFirstname} value={userDetail?.result?.first_name} title={'First name'} />
          <EditProfileBlock name={lastname} setname={setLastname} value={userDetail?.result?.last_name} title={'Last name'} />

          <EditProfileBlock name={email} setname={setemail} value={userDetail?.result?.email} title={'Email ID'} />
          {
            userDetail?.result?.addressDetail !== undefined &&
            <EditProfileBlock value={userDetail?.result?.addressDetail?.street + " ," + userDetail?.result?.addressDetail?.city + " " + userDetail?.result?.addressDetail?.country?.name} title={'Address'}
            />
          }
          {
            userDetail?.result?.addressDetail === undefined &&
            <EditProfileBlock value={"No Address Detail Added"} title={'Address'}
            />
          }
          <RatingCard />
          <EditProfileBlock value={'1,200'} title={'Number of followers'} />



        </View>
        <View style={[styles.textFlatlistView, { marginTop: 20 }]}>
          <Text style={styles.title}> Product Listings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ViewAllListing')}>
            <Text style={styles.titleSee}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* { Productlist?.map((item)=>( <RenderList item ={item} />))} */}
        <FlatList
          numColumns={2}
          style={{ height: hp(100), padding: 10, marginLeft: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => renderList(item)}
          data={Productlist}
        />

      </ScrollView>
    </View>
  )
}

export default SellerDetail
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: COLORS.Green,
    borderRadius: 20,
    height: hp(25),
    width: wp(40),
    padding: 10,
    marginRight: 16,
    marginLeft: 6,
    marginBottom: 15,
    justifyContent: "space-around"


  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: COLORS.Black,
    opacity: .5,
    marginTop: -17
  },
  titleSee: {
    fontWeight: '400',
    color: COLORS.Green,
    fontSize: 10,
    marginTop: -10
  },
  textFlatlistView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    padding: 20
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.Green,
    borderRadius: 20,
    height: hp(19),
    width: wp(39),
    padding: 10,
    marginRight: 6,
    marginLeft: 12,
    marginBottom: 13

  }
})