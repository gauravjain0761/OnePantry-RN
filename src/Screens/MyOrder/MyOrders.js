import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { hp, wp } from '../../Components/Config';
import BackComponent from '../../Components/BackComponent';
import { getOrders } from '../../../Shared/settingAction';
import { useSelector, useDispatch } from 'react-redux';
import { vs } from 'react-native-size-matters';
import CardLayout from '../../Components/CardLayout';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ marginTop: hp(2), flexDirection: 'row', marginHorizontal: wp(6), borderRadius: 20, overflow: 'hidden' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, height: 44, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.View style={{ opacity, backgroundColor: '#56AB2F', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontWeight: '500', fontSize: vs(11.5) }} >{label}</Text>
            </Animated.View>
            <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0, top: 0, zIndex: -1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#666666', fontWeight: '500', fontSize: vs(11.5) }} >{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const SellerTab = () => <TabScreen type={false} />

const BuyerTab = () => <TabScreen type={true} />

class MyTabs extends React.PureComponent {




  render() {
    return (
      <View style={{ flex: 1 }}>
        <BackComponent text={'My Order'} />
        <Tab.Navigator
          tabBar={MyTabBar}
        >
          <Tab.Screen name="Seller" component={SellerTab} />
          <Tab.Screen name="Buyer" component={BuyerTab} />
        </Tab.Navigator>
      </View>

    );
  }
}

export default MyTabs



function TabScreen({ type }) {

  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const { orderList, orderlimit, orderLoading, sellerOrderList, sellerOrderlimit } = useSelector(state => state.actionSlice)

  const userType = useMemo(() => {

    if (type) {

      return {
        userType: 'user',
        data: orderList,
        limit: orderlimit
      }

    } else {

      return {
        userType: 'seller',
        data: sellerOrderList,
        limit: sellerOrderlimit
      }

    }

  }, [type, sellerOrderlimit, orderlimit, orderList, sellerOrderList])

  useEffect(() => {
    dispatch(getOrders({
      "limit": userType?.limit,
      "page": "",
      "sorting": "",
      "search_key": "",
      "type": userType.userType
    }))
  }, [])

  const fetchList = () => {
    dispatch(getOrders({
      "limit": userType?.limit + 6,
      "page": "",
      "sorting": "",
      "search_key": "",
      "type": userType.userType
    }))
  }


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchList()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);



  return (
    <View style={{ paddingHorizontal: wp(6), paddingTop: 40 }} >
      <FlatList
        onEndReached={fetchList}
        showsVerticalScrollIndicator={false}
        data={userType?.data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={(({ item, index }) => <CardLayout navigation={navigation} type={type} item={item} key={index.toString()} />)}
        ListFooterComponent={() => {
          return (
            <View style={{ height: 100 }} >
              {orderLoading && <ActivityIndicator  style={{ marginTop: hp(5) }} size={30} color={'#56AB2F'} />}
            </View>

          )
        }}
      />
    </View>
  )
}


