import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext, useRef, forwardRef, useMemo, useImperativeHandle } from 'react'
import { IMAGE, COLORS, TEXT } from '../../Constant/Images/index'
import { useNavigation } from '@react-navigation/native';
import BackComponent from '../../Components/BackComponent';
import SearchComponent from '../../Components/SearchComponent';
import { useForm } from 'react-hook-form';
import { HomeContext } from '../../Providers/HomeProvider';
import { hp, wp } from '../../Components/Config';
import { Image_URL } from '../../Providers';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch ,useSelector } from 'react-redux';
import { addFaviourite,productList } from '../../../Shared/settingAction';
import BottomFilterComponent from '../../Components/BottomFilterComponent';
const { width, height } = Dimensions.get('window');


const HomeViewListing = (props) => {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { API_HOME, searchData, setsearchData ,Productlist} = useContext(HomeContext);
    const ProductDetails = useLoadingFn(API_HOME.ProductDetails);
    const HomeSearching = useLoadingFn(API_HOME.HomeSearching);
    const Filterref = useRef(null)
    const [paramsState, setParams] = useState({})
    const [searchText, setSearchText] = useState('')
    const ProductList = useLoadingFn(API_HOME.ProductList);
    const dispatch = useDispatch()
    const { productListData,setproductListData, orderDetailData } = useSelector(state => state.actionSlice)
    console.log(props?.route?.params?.category_name, 'p============================>')
    const onSearch = (data) => {
        HomeSearching({
            params: data, onSuccess: () => {
            }
        })
        setSearchText(data?.search_key)

    }
    // const onSearch = (text) => {
    //     setSearchText(text);
    //     const newData = productListData.filter((item) => {
    //       const itemData = `${item.title} ${item.name}`.toUpperCase();
    //       const textData = text.toUpperCase();
    //       return itemData.indexOf(textData) > -1;
    //     });
    //     setSearchText(newData);
    //     if (text === '') {
    //         setSearchText(activityData);
    //     }
    //   };
    // const handleSearch = () => {
    //     handleSubmit(onSearch);
    // };

    // useEffect(() => {
    //     setsearchData("")
    // }, [])

    const OnProductDetail = (item) => {
        ProductDetails({ params: { product_id: item._id }, onSuccess: () => { navigation.navigate('ItemDetails', { item }) }, })
    }

    const onFilterSelect = (val) => {

        const params = {
            "limit": "",
            "sorting": "",
            "page": "",
            "search_key": searchText,
            filter_type: val || paramsState
        }

        HomeSearching({
            params,
            onSuccess: () => {
                Filterref?.current?.setSheetIndex(0)
            }
        })

        setParams(params)
    }

// useEffect(() => {
//     ProductList({
//         params: {
//             "limit": "",
//             "sorting": "",
//             "page": "",
//             "search_key": "",
//             filter_type: 'Dsc',
//             category_id:props?.route?.params?._id
//         }, onSuccess: () => { },
//     })
// }, [])

const renderList = ({ item }) => {

    return (
        <TouchableOpacity onPress={() => OnProductDetail(item)} style={styles.card}>
            <LikeComponent item={item} />
            <View style={{ height: hp(13.7), width: wp(30), alignSelf: 'center', justifyContent: 'center'}}>
                <Image source={{ uri: Image_URL + item?.product_img[0]?.image }} resizeMode='cover' style={{ alignSelf: 'center', height:hp(14), width:wp(35.3) ,borderRadius: 12}} />
            </View>
            <Text style={{ fontWeight: '500', fontSize: 10, color: COLORS.Black, opacity: .5 ,marginTop:10}}>{item.name}</Text>
            <Text style={{ fontWeight: '400', fontSize: 6, color: COLORS.Black, opacity: .5 }}>{item.description}</Text>
            <View>
                <Text style={{ fontWeight: '500', fontSize: 14, color: COLORS.Green, position: 'absolute', bottom: 0, right: 10 }}>{'$' + item.selling_price}</Text>
            </View>
        </TouchableOpacity>
    )
}
    const RenderList = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => OnProductDetail(item)} style={styles.card}>
                <View style={{ height: hp(13.5), width: wp(30), alignSelf: 'center', justifyContent: 'center', borderRadius: 12 }}>
                    <Image source={{ uri: Image_URL + item?.category_id?.image }} resizeMode='contain' style={{ alignSelf: 'center', height: 80, width: 80 }} />
                </View>
                <Text style={{ fontWeight: '500', fontSize: 10, color: COLORS.Black, opacity: .5 }}>{item.name}</Text>
                <Text style={{ fontWeight: '400', fontSize: 6, color: COLORS.Black, opacity: .5 }}>{item.description}</Text>
                <View>
                    <Text style={{ fontWeight: '500', fontSize: 14, color: COLORS.Green, position: 'absolute', bottom: 0, right: 10 }}>{'$' + item.selling_price}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const LikeComponent = ({ item }) => {
console.log(item.isLike,'kkkk')
        const [like, setLike] = useState(item?.isLike)

        return (
            <TouchableOpacity onPress={() => {

                dispatch(addFaviourite({
                    "product_id": item?._id,
                   
                }))
              setLike(!like)
            }} style={{ height: 30, width: 30, zIndex: 1, position: 'absolute', right: '4%', top: '4%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={like ? IMAGE.liked : IMAGE.Like} style={{ height: '70%', width: '70%', resizeMode: 'contain' }} />
              
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <BackComponent empty={onSearch} text={props?.route?.params?.category_name} />
            <SearchComponent
                onPress={() => Filterref?.current?.setSheetIndex(1)}
                returnKeyType={"search"}
                onSubmitEditing={handleSubmit(onSearch)}
                textInputProps={{ placeholder: 'Search', keyboardType: 'email-address', autoCapitalize: 'none', }}
                controllerProps={{
                    name: 'search_key',
                    control,
                    errors,
                    rules: {
                        required: false,
                    },
                }}
            />

            {/* <FlatList
                numColumns={2}
                style={{ height: hp(100), padding: 10, marginLeft: 10 }}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => <RenderList {...item} />}
                data={searchData == "" ? null : searchData.data.search_data}
            /> */}
             {productListData?.length == 0 ?
                 <View style={{ justifyContent: 'center', alignItems: 'center' ,flex:1}}>
                 <Image source={IMAGE.Emptyfavorite} resizeMode='contain' style={{ width: 187, height: 200}} />
                 <Text style={{ color: '#495765', fontSize: 21, fontWeight: 600 }}>{'No items here'}</Text>
               </View> :
                <FlatList
                numColumns={2}
                style={{ height: hp(100), padding: 10, marginLeft: 10 }}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => renderList(item)}
                data={productListData}
            />}

        </View>
    )
}

export default HomeViewListing

const FilterComponent = (props, ref) => {

    const [sheetIndex, setSheetIndex] = useState(0)
    const snapPoints = useMemo(() => [1, '38%'], []);


    useImperativeHandle(ref, () => ({
        setSheetIndex
    }))

    return (
        <BottomFilterComponent
            setSheetIndex={setSheetIndex}
            sheetIndex={sheetIndex}
            snapPoints={snapPoints}
            {...props}
        />
    )
}



  // Rest of your component code


const RefFilter = forwardRef(FilterComponent)

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1
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
        paddingVertical: 10
    },
    card: {
        borderWidth: 1,
        borderColor: COLORS.Green,
        borderRadius: 20,
        height: hp(20),
        width: wp(40),
        padding: 10,
        marginRight: 16,
        marginLeft: 6,
        marginBottom: 15
    }
})
