import {Image, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import BackComponent from '../../Components/BackComponent';
import {HomeContext} from '../../Providers/HomeProvider';
import {useIsFocused} from '@react-navigation/native';
import FavoriteCartComponent from '../../Components/favoriteCartComponent';
import {COLORS, IMAGE} from '../../Constant/Images';
import {hp} from '../../Components/Config';
import {ScrollView} from 'react-native-gesture-handler';
import {AppContext} from '../../Providers/AppProvider';
const Favorites = () => {
  const {API_HOME, Favoritelist, Productlist} = useContext(HomeContext);
  const isFocused = useIsFocused();
  const FavoriteList = useLoadingFn(API_HOME.FavoriteList);
  const {setcommonLoaderFv, commonLoaderFv, setLoading} =
    useContext(AppContext);
  const [loader, setloader] = useState(false);
  const Favorite = () => {
    setcommonLoaderFv(true);
    FavoriteList({
      params: {},
      onSuccess: () => {
        setcommonLoaderFv(false);
      },
    });
  };

  useEffect(() => {
    Favorite();
  }, []);

  useEffect(() => {
    if (isFocused) {
      Favorite();
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: '#E5E5E5'}}>
      <BackComponent text={'Favorites'} />
      {/* <View style={styles.mainView}>
        <Text style={styles.text}>{"Favorites"}</Text>
      </View> */}
      {Favoritelist?.search_data?.length == 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginBottom: 50,
          }}>
          <Image
            source={IMAGE.Emptyfavorite}
            resizeMode="contain"
            style={{width: 187, height: 200, marginTop: 20}}
          />
          <Text style={{color: '#495765', fontSize: 21, fontWeight: 600}}>
            {'No items here'}
          </Text>
          <Text style={{color: 'grey', fontSize: 15, marginTop: 4}}>
            {'Add favorites you want to find them here'}
          </Text>
        </View>
      ) : (
        <ScrollView>
          {commonLoaderFv ? <ActivityIndicator color={COLORS.Green} /> : null}
          {Favoritelist?.search_data?.map(item => (
            <FavoriteCartComponent
              data={item}
              favorite
              id={item?.productDetail?._id}
              textone={item.productDetail.name}
              texttwo={item?.productDetail?.description}
              textthree={item?.productDetail?.selling_price}
              image={item.productDetail?.product_img[0]?.image}
              Fav
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Favorites;
const styles = StyleSheet.create({
  mainView: {
    height: hp(12),
    alignItems: 'center',

    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    color: COLORS.Green,
    textAlign: 'center',
  },
});
