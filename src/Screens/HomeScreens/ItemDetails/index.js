import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
  Linking,
  FlatList,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {COLORS, IMAGE, Images} from '../../../Constant/Images';
import Counter from '../../../Components/Counter';
import Button from '../../../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {HomeContext} from '../../../Providers/HomeProvider';
import {Image_URL} from '../../../Providers';
import {hp, wp} from '../../../Components/Config';
import {ShopContext} from '../../../Providers/ShopProvidre';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from '../../../Providers/AuthProvider';
import {
  addFaviourite,
  followUnfollow,
  productList,
} from '../../../../Shared/settingAction';
import {useGetProductDetailsQuery} from '../../../Services';
import {
  CarouselComponent,
  CustomerRating,
  DetailsText,
  Header,
  ProductItem,
  SellerDetailsComponent,
} from '../../../Components';
import useItemDetails from './useItemDetails';
import useStyle from './styles';

const ItemDetails = ({route}) => {
  const styles = useStyle();
  const {
    productDetails,
    CategoryData,
    count,
    like,
    UserData,
    setDefaultRating,
    setCount,
    setLike,
    navigationHandler,
  } = useItemDetails();

  const navigation = useNavigation();

  //---------------APIs variables/values-------------------------------------//
  const {API_HOME} = useContext(HomeContext);
  const {data} = useGetProductDetailsQuery(route.params?.item?.id);
  const ProductDtl = data?.data?.productData;
  const AddToCart = useLoadingFn(API_HOME.AddToCart);
  const dispatch = useDispatch();
  const {productListData} = useSelector(state => state.actionSlice);
  const {countData, setcountData} = useContext(ShopContext);
  const ProductDetails = useLoadingFn(API_HOME.ProductDetails);

  useEffect(() => {
    if (ProductDtl) {
      dispatch(
        productList({
          limit: '',
          sorting: '',
          page: '',
          search_key: '',
          filter_type: 'Dsc',
          category_id: ProductDtl?.category_id?.id,
        }),
        console.log(
          productListData,
          'productListDataproductListDataproductListData',
        ),
      );
    }
  }, []);

  const AddCartData = () => {
    AddToCart({
      params: {product_id: ProductDtl?.id, quantity: count},
      onSuccess: () => {
        setcountData(countData + 1),
          Alert.alert('Product added successfully'),
          ProductDetails({
            params: {product_id: ProductDtl.id},
            onSuccess: () => {},
          });
      },
    });
  };
  useEffect(() => {}, [like]);
  const OnLike = () => {
    dispatch(
      addFaviourite(
        {
          product_id: productDetails?.id,
        },
        setLike(productDetails?.isLike),
        ProductDetails({
          params: {product_id: productDetails.id},
          onSuccess: () => {
            like === false ? setLike(0) : setLike(1);
          },
        }),
      ),
    );
  };
  useEffect(() => {
    setLike(ProductDtl?.isLike);
  }, [like]);

  const GoToCart = () => {
    navigation.navigate('ShopStack', {screen: 'YourCart'});
  };
  const onShare = async () => {
    try {
      const url = await Linking.getInitialURL();
      const params = new URLSearchParams({
        /* add any query params here */
      });
      const deepLink = Linking.createURL(
        '../../Providers/HomeProvider/ItemDetails',
        {
          /* add any path params here */
        },
      );
      const shareUrl = `${url}${deepLink}?${params.toString()}`;
      const result = await Share.share({
        message: 'Check out this link!',
        url: shareUrl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const LikeComponent = ({item}) => {
    console.log(item.isLike, 'kkkk');
    const [like, setLike] = useState(item?.isLike);

    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(
            addFaviourite({
              product_id: item?._id,
            }),
          );
          like === true ? setLike(1) : setLike(0);
        }}
        style={{
          height: 30,
          width: 30,
          zIndex: 1,
          position: 'absolute',
          right: '4%',
          top: '4%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={like ? IMAGE.liked : IMAGE.Like}
          style={{height: '70%', width: '70%', resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    );
  };
  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={
          () => console.log(item)
          //  OnProductDetail(item)
        }
        style={styles.card}>
        <LikeComponent item={item} />
        <View
          style={{
            height: hp(13.7),
            width: wp(30),
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: Image_URL + item?.product_img[0]?.image}}
            resizeMode="cover"
            style={{
              alignSelf: 'center',
              height: hp(14),
              width: wp(35.3),
              borderRadius: 12,
            }}
          />
        </View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 10,
            color: COLORS.Black,
            opacity: 0.5,
            marginTop: 10,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 6,
            color: COLORS.Black,
            opacity: 0.5,
          }}>
          {item.description}
        </Text>
        <View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              color: COLORS.Green,
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

  return (
    <View style={styles.container}>
      <Header
        text="Details"
        image={Images.share}
        onPress={onShare}
        imageStyle={styles.imageStyle}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <CarouselComponent
          product_images={productDetails?.product_images}
          CategoryData={CategoryData}
        />
        <ProductItem
          title={productDetails?.name}
          image
          like={like}
          onPressLike={OnLike}
        />
        <ProductItem
          title={`Product Weight:${productDetails?.size}`}
          titleStyle={styles.weight}
        />
        <View style={styles.counterContainer}>
          <Counter count={count} setcount={setCount} />
          <Text style={styles.sellingPrice}>
            {'$' + productDetails?.selling_price}
          </Text>
        </View>
        <View style={styles.separator} />
        <DetailsText
          title="Product Detail"
          value={productDetails?.description}
          titleStyle={styles.productDescriptionTitle}
          valueStyle={styles.productDescriptionValue}
        />

        {route.params?.isLike !== false && (
          <SellerDetailsComponent
            UserData={UserData}
            onPress={() => {
              // navigation.navigate('SellerDetail')
            }}
            onPressFollow={() => {
              let data = {
                type: 'unfollow',
                unfollow_id: ProductDtl?.seller?._id,
              };

              dispatch(followUnfollow(data));
            }}
          />
        )}
        <View style={[styles.separator, styles.separatorMargin]} />
        <ProductItem
          title="Expiration Date"
          value={productDetails?.expire_date}
          titleStyle={styles.expiryTitle}
          valueStyle={styles.expiryValue}
        />
        <View style={[styles.separator, styles.separatorMargin]} />
        <CustomerRating
          rating={productDetails?.avgRating}
          setDefaultRating={setDefaultRating}
        />
        <ProductItem
          title="Reviews"
          value={`${productDetails?.customer_review ?? 0} Customer Ratings`}
          titleStyle={styles.reviewTitle}
          valueStyle={styles.reviewValue}
        />
        <View style={[styles.separator, styles.separatorMargin]} />
        <ProductItem
          title="Item Number"
          value={productDetails?.itemNumber}
          titleStyle={styles.expiryTitle}
          valueStyle={styles.ucpValue}
        />
        <View style={[styles.separator, styles.separatorMargin]} />
        <ProductItem
          title="UPC Code"
          value={productDetails?.upc_code}
          titleStyle={styles.expiryTitle}
          valueStyle={styles.ucpValue}
        />
        <View style={[styles.separator, styles.separatorMargin]} />
        <ProductItem
          title="Shipping"
          value="Self ship"
          titleTwoValue={productDetails?.seller?.address?.cit ?? ''}
          address={true}
          titleStyle={styles.expiryTitle}
          valueStyle={styles.ucpValue}
          onPress={navigationHandler}
        />

        <Button
          title={ProductDtl?.addToCarted == true ? 'Go To Cart' : 'Add to Cart'}
          style={{
            marginTop: 20,
            backgroundColor: COLORS.Green,
            borderRadius: 15,
            alignSelf: 'center',
            marginBottom: 10,
            width: wp(45),
          }}
          color={{color: '#fff'}}
          onPress={ProductDtl?.addToCarted == true ? GoToCart : AddCartData}
        />
        <View style={{}}>
          <FlatList
            style={{height: hp(30), padding: 10, marginLeft: 10}}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={item => renderList(item)}
            data={productListData}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ItemDetails;
