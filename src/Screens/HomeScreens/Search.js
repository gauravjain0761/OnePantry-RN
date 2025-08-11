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
import BottomFilterComponent from '../../Components/BottomFilterComponent';
const { width, height } = Dimensions.get('window');


const Search = () => {
  const [search, setsearch] = useState('')
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { API_HOME, searchData, setsearchData } = useContext(HomeContext);
  const ProductDetails = useLoadingFn(API_HOME.ProductDetails);
  const HomeSearching = useLoadingFn(API_HOME.HomeSearching);
  const Filterref = useRef(null)
  const [paramsState, setParams] = useState({})
  const [searchText, setSearchText] = useState('')

  const onSearch = (data) => {
    console.log(data, 'data--------------------->')
    HomeSearching({
      params: data, onSuccess: () => {
      }
    })
    setSearchText(data?.search_key)
    
  }

  const handleSearch = () => {
    handleSubmit(onSearch);
  };

  useEffect(() => {
    setsearchData("")
  }, [])

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


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <BackComponent empty={onSearch} text={'View All Listings'} />
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

      <FlatList
        numColumns={2}
        style={{ height: hp(100), padding: 10, marginLeft: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => <RenderList {...item} />}
        data={searchData == "" ? null : searchData.data.search_data}
      />
      <RefFilter
        ref={Filterref}
        onFilterSelect={onFilterSelect}
      />

    </View>
  )
}

export default Search



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
    height: hp(23),
    width: wp(40),
    padding: 10,
    marginRight: 16,
    marginLeft: 6,
    marginBottom: 15
  }
})
