import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Images, ScreenNames, productStatus} from '../../../Constant';
import useProductItem from './useProductItem';
import useStyle from './styles';

const ProductItem = props => {
  const styles = useStyle();
  const {item, isFavorite = false, onPressFavorite = () => undefined} = props;
  const {status = '', id = ''} = item ?? {};
  const imageUrl = item.product_images[0]
    ? decodeURIComponent(item.product_images[0])
    : null;
  const {navigationHandler, deleteHandler, publishHandler} = useProductItem();
  const isDraft = status === productStatus.Draft;
  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigationHandler(ScreenNames.SellerItemDetail, {item, isLike: false})
        }>
        <Image
          source={{uri: imageUrl}}
          resizeMode="cover"
          style={styles.productImage}
        />
        <View style={styles.infoCard}>
          <View style={styles.nameContainer}>
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            <Text style={styles.description}>{item.itemNumber}</Text>
          </View>
          <Text style={styles.price}>{'$' + item.selling_price}</Text>
        </View>
        {isFavorite ? (
          <TouchableOpacity
            onPress={onPressFavorite}
            style={styles.favoriteButton}>
            <Image
              source={false ? Images.liked : Images.like}
              resizeMode="contain"
              style={styles.favoriteImage}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.userActionContainer}>
            <TouchableOpacity
              onPress={() =>
                navigationHandler(ScreenNames.EditItemScreen, item)
              }>
              <Image
                source={Images.editCard}
                resizeMode="contain"
                style={styles.actionImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteHandler(id, isDraft)}>
              <Image
                source={Images.bin}
                resizeMode="contain"
                style={styles.actionImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => publishHandler(id, isDraft)}>
              <Image
                source={Images.upload}
                resizeMode="contain"
                style={styles.actionImage}
              />
            </TouchableOpacity>
          </View>
        )}
        {/* 
          <View
            style={{
              justifyContent: 'space-around',
              position: 'absolute',
              bottom: 55,
              right: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('editItemScreen', item);
              }}>
              <Image
                source={Images.editCard}
                resizeMode="contain"
                style={{
                  alignSelf: 'center',
                  height: hp(4),
                  width: wp(8),
                  borderRadius: 9,
                  marginBottom: 7,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Alert.alert('Delete Item', 'You want delete this item', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => DeleteItems(item.id)},
                ]);
              }}>
              <Image
                source={Images.bin}
                resizeMode="contain"
                style={{
                  alignSelf: 'center',
                  height: hp(4),
                  width: wp(8),
                  borderRadius: 9,
                  marginBottom: 7,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Unpublish Item',
                  'You want to Unpublish this item?',
                  [
                    {
                      text: 'NO',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'YES',
                      onPress: () => {
                        Publish(item.id);
                      },
                    },
                  ],
                );
              }}>
              <Image
                source={Images.upload}
                resizeMode="contain"
                style={{
                  alignSelf: 'center',
                  height: hp(4),
                  width: wp(8),
                  borderRadius: 9,
                }}
              />
            </TouchableOpacity>

        </View> */}
      </TouchableOpacity>
    </View>
  );
};
export default ProductItem;
