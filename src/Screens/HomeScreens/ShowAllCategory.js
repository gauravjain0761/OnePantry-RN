import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native'
import React, { useState, useContext, useRef ,forwardRef,useMemo,useImperativeHandle} from 'react'
import { IMAGE, COLORS, TEXT } from '../../Constant/Images/index'
import { useNavigation } from '@react-navigation/native';
import BackComponent from '../../Components/BackComponent';
import SearchComponent from '../../Components/SearchComponent';
import { hp, wp } from '../../Components/Config';
import { HomeContext } from '../../Providers/HomeProvider';
import { Image_URL } from '../../Providers';
import { useDispatch  } from 'react-redux';
import { productList } from '../../../Shared/settingAction';
import BottomFilterComponent from '../../Components/BottomFilterComponent';
const { width, height } = Dimensions.get('window');

const ShowAllCategory = (props) => {
    const {CatList,  setCatList, } = useContext(HomeContext);
    const Filterref = useRef(null)
    const dispatch = useDispatch()
    const navigation = useNavigation()
const [search, setsearch] = useState('')
const [filterData, setfilterData] = useState([])
    const OnCategoryClick =(item)=>{
        dispatch(productList({
            "limit": "",
                "sorting": "",
                "page": "",
                "search_key": "",
                filter_type: 'Dsc',
                category_id:item._id
        }), navigation.navigate('HomeViewListing',item))
    
    }  
    const [ascending, setAscending] = useState(true);
    const onFilterSelect = (val) => {

      
        const sortedData = [...CatList].sort((a, b) => {
            if (ascending) {
              return a.category_name.localeCompare(b.category_name);
            } else {
              return b.category_name.localeCompare(a.category_name);
            }
          });
          setCatList(sortedData);
          setAscending(!ascending);
          Filterref?.current?.setSheetIndex(0)
      


    }
    const handleSearch = (text) => {
          setsearch(text)
         const newData =CatList.filter((item) => {
          const itemData = `${item.category_name } ${item.category_name }`.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setfilterData(newData)
       
        if (text === '') {
            setfilterData(CatList)
          
          }
      };
   
    const renderItems = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {OnCategoryClick(item)} } style={styles.card}>
                <Image source={{ uri: Image_URL + item.image }} resizeMode='contain' style={{ borderRadius: 13, height: 125, width: 130 }} />
                <Text style={{ fontWeight: '500', fontSize: 12, color: COLORS.Green, marginTop: 5 }}>{item.category_name === "undefined" ? null : item.category_name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <BackComponent text={'View All Listings'} />    
            {/* <SearchComponent style={{ marginRight: 10 }} styleView={{ marginTop: 5 }} TouchFn /> */}
            <View style={[styles.mainView]}>
            <View onPress={() => navigation.navigate('Search')} style={[styles.touchStyyle]}>
          <Image source={IMAGE.Search} style={{ height: 20, width: 20, marginHorizontal: 10 }} />
          <TextInput
                                    style={{ width: '80%', marginTop: 3, padding: 2 }}
                                    onChangeText={(search) =>{handleSearch(search)}}
                                    value={search}
                                    placeholder={'Search'}
                                    placeholderTextColor={"lightgrey"}
                                    autoCapitalize='none'

                                />
        </View>
        <TouchableOpacity onPress={() => {
      
            Filterref?.current?.setSheetIndex(1)
        
       // setShow(true)
      }
      }>
        <Image source={IMAGE.Filter} resizeMode='contain' style={{ width: 37, height: 37 , marginRight:15 }} />
      </TouchableOpacity>
      </View>
            <FlatList
                numColumns={2}
                style={{ height: hp(100), padding: 10, marginLeft: 10 }}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => renderItems(item)}
                data={search == ''? CatList : filterData}
            />
 <RefFilter
                    ref={Filterref}
                    onFilterSelect={onFilterSelect}
                />

        </View>
    )
}

const FilterComponent = (props, ref) => {

    const [sheetIndex, setSheetIndex] = useState(0)
    const snapPoints = useMemo(() => [1, '60%'], []);


    useImperativeHandle(ref, () => ({
        setSheetIndex
    }))

    return (
        <BottomFilterComponent
            setSheetIndex={setSheetIndex}
            sheetIndex={sheetIndex}
            snapPoints={snapPoints}
            {...props}
            onlySort
        />
    )
}

const RefFilter = forwardRef(FilterComponent)
export default ShowAllCategory





const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: COLORS.Green,
        borderRadius: 20,
        height: hp(22),
        width: wp(40),
        padding: 10,
        marginRight: 16,
        marginLeft: 6,
        marginBottom: 15,
      justifyContent:'space-around',
      alignItems:'center'


    },
    touchStyyle: {
        borderColor: COLORS.Green,
        borderRadius: 13,
        height: hp(5),
        width: wp(72),
        borderWidth: 1,
        // justifyContent:'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    
      },
      mainView: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingVertical: 8,
        width: width / 1.1,
        marginLeft: 15,
        alignSelf: 'center'
      },
})
