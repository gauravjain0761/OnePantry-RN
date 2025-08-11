import React, {useState} from 'react';
import {View, Text, ScrollView, Share, Alert, Linking} from 'react-native';
import {
  CarouselComponent,
  CustomerRating,
  DetailsText,
  Header,
  ProductItem,
} from '../../../Components';
import {Images} from '../../../Constant/Images';
import Counter from '../../../Components/Counter';
import useSellerItemDetails from './useSellerItemDetails';
import useStyle from './styles';

const SellerItemDetails = () => {
  const styles = useStyle();
  const {
    productDetails,
    CategoryData,
    count,
    defaultRating,
    setDefaultRating,
    setCount,
    navigationHandler,
  } = useSellerItemDetails();

  // To set the max number of Stars

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
        <ProductItem title={productDetails?.name} />
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
          titleStyle={styles.expiryTitle}
          valueStyle={styles.ucpValue}
          onPress={navigationHandler}
        />
      </ScrollView>
    </View>
  );
};

export default SellerItemDetails;
