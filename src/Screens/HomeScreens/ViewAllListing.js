import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { IMAGE, COLORS, TEXT } from '../../Constant/Images/index'
import { useNavigation } from '@react-navigation/native';
import BackComponent from '../../Components/BackComponent';
import SearchComponent from '../../Components/SearchComponent';
import { hp, wp } from '../../Components/Config';
import { useForm } from 'react-hook-form';
import { HomeContext } from '../../Providers/HomeProvider';
import { Image_URL } from '../../Providers';
import { useDispatch ,useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const ViewAllListing = () => {
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
        <View style={{ flex: 1 }}>
            <BackComponent text={'View All Listings'} />
            <SearchComponent style={{ marginRight: 10 }} styleView={{ marginTop: 5 }} TouchFn />

            <FlatList
                numColumns={2}
                style={{ height: hp(100), padding: 10, marginLeft: 10 }}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => renderList(item)}
                data={Productlist}
            />


        </View>
    )
}

export default ViewAllListing
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


    }
})
const dataTwo = [
    {
        image: IMAGE.CaneOne,
        name: 'Side Dishes',
        quntity: '1 Package 500 Ons',
        price: '$ 15.00'

    },
    {
        image: IMAGE.CaneTwo,
        name: 'Vegetables',
        quntity: '1 Package 500 Ons',
        price: '$ 15.00'
    },
    {
        image: IMAGE.CaneThree,
        name: 'Spice',
        quntity: '1 Package 500 Ons',
        price: '$ 15.00'
    },
    {
        image: IMAGE.CaneOne,
        name: 'Side Dishes',
        quntity: '1 Package 500 Ons',
        price: '$ 15.00'
    },
    {
        image: IMAGE.CaneTwo,
        name: 'Vegetables',
        quntity: '1 Package 500 Ons',
        price: '$ 15.00'
    },
    {
        image: IMAGE.CaneOne,
        name: 'Side Dishes',
        quntity: '1 Package 500 Ons',
        price: '$ 15.00'
    },
    {
        image: IMAGE.CaneTwo,
        name: 'Vegetables',
        quntity: '1 Package 500 Ons',
        price: '$ 15.00'
    },
]