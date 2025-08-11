import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {useDispatch} from 'react-redux';
import {
  FilterComponent,
  HomeHeader,
  EmptyList,
  CategoriesListing,
} from '../../../Components';
import {Images} from '../../../Constant/Images/index';
import {useNavigation} from '@react-navigation/native';
import SearchComponent from '../../../Components/SearchComponent';
import {HomeContext} from '../../../Providers/HomeProvider';
import {addFaviourite, productList} from '../../../../Shared/settingAction';
import {colors} from '../../../Constant';
import {hp, wp} from '../../../Utils';
import useHomeScreen from './useHome';
import useLoadingFn from '../../../Hook/useLoadingFn';
import useStyle from './styles';

const Home = () => {
  const navigation = useNavigation();
  const styles = useStyle();
  const {categories, filterRef, products, loader, refreshing, onRefresh} =
    useHomeScreen();
  const {API_HOME} = useContext(HomeContext);
  const ProductList = useLoadingFn(API_HOME.ProductList);
  const ProductDetails = useLoadingFn(API_HOME.ProductDetails);
  const dispatch = useDispatch();

  const OnProductDetail = item => {
    navigation.navigate('ItemDetails', {item});
  };

  const OnCategoryClick = item => {
    dispatch(
      productList({
        limit: '',
        sorting: '',
        page: '',
        search_key: '',
        filter_type: 'Dsc',
        category_id: item._id,
      }),
      navigation.navigate('HomeViewListing', item),
    );
  };

  const LikeComponent = ({item}) => {
    const [like, setLike] = useState(item?.isLike ?? false);

    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(
            addFaviourite({
              product_id: item?.id,
              like,
            }),
          );
          like == 0 ? setLike(1) : setLike(0);
        }}
        style={{
          height: 30,
          width: 30,
          zIndex: 1,
          position: 'absolute',
          right: '5%',
          top: '5%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={like ? Images.liked : Images.like}
          style={{height: '70%', width: '70%', resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    );
  };

  const renderList = ({item}) => {
    const imageUrl = item.product_images[0]
      ? decodeURIComponent(item.product_images[0])
      : null;

    return (
      <TouchableOpacity
        onPress={() => OnProductDetail(item)}
        style={styles.card}>
        <LikeComponent item={item} />
        <View
          style={{
            height: hp(13.7),
            width: wp(30),
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          {item.product_images && item.product_images.length > 0 && (
            <Image
              source={{uri: imageUrl}} // Use the first image in the array
              resizeMode="cover"
              style={{
                alignSelf: 'center',
                height: hp(14),
                width: wp(35.3),
                borderRadius: 12,
              }}
            />
          )}
        </View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 10,
            color: colors.black,
            opacity: 0.5,
            marginTop: 9,
          }}>
          {item.name.length > 12
            ? `${item.name.substring(0, 12)}...`
            : item.name}
        </Text>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 6,
            color: colors.black,
            opacity: 0.5,
          }}>
          {item.description}
        </Text>
        <View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              color: colors.primary,
              position: 'absolute',
              bottom: 0,
              right: 10,
            }}>
            {'$' + item.selling_price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onFilterSelect = val => {
    const params = {
      limit: '',
      sorting: '',
      page: '',
      search_key: '',
      filter_type: val,
    };

    ProductList({
      params,
      onSuccess: () => {
        filterRef?.current?.setSheetIndex(0);
      },
    });
  };

  class ListingCards extends React.Component {
    render() {
      return (
        <View style={{height: hp(80)}}>
          <FlatList
            numColumns={2}
            ListFooterComponent={() => <View style={{height: hp(50)}} />}
            showsVerticalScrollIndicator={false}
            renderItem={renderList}
            data={products}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.contentContainer}>
        <SearchComponent
          onPress={() => filterRef?.current?.setSheetIndex(1)}
          styleView={styles.search}
          TouchFn
        />
        <CategoriesListing
          onPress={item => OnCategoryClick(item)}
          categories={categories}
        />
        <View style={[styles.listingHeader, {marginTop: 20}]}>
          <Text style={styles.title}>Listings</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewAllListing')}>
            <Text style={styles.titleSee}>View All</Text>
          </TouchableOpacity>
        </View>
        {loader ? <ActivityIndicator color={colors.primary} /> : null}
        {products?.length == 0 ? (
          <EmptyList onRefresh={onRefresh} />
        ) : (
          <ListingCards />
        )}
        <FilterComponent ref={filterRef} onFilterSelect={onFilterSelect} />
      </View>
    </View>
  );
};

export default Home;
