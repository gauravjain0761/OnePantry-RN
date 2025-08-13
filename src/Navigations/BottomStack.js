import { Text, Image } from "react-native";
import React from "react";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import FavoriteStack from "./FavoriteStack";
import ShopStack from "./ShopStack";
import { IMAGE, COLORS } from "../Constant/Images/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { hp } from "../Components/Config";
const Tab = createBottomTabNavigator();
const BottomStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: { height: hp(9), width: "100%" },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        listeners={
          {
            // tabPress: e => {
            //   getRefreshHome ? navigation.push('HomeScreen'):null
            //   },
          }
        }
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.Green : "#AEAEB2",
                fontSize: 10,
                marginTop: 7,
              }}
            >
              Home
            </Text>
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 23,
                height: 23,
                tintColor: focused ? COLORS.Green : "#AEAEB2",
                resizeMode: "contain",
                marginTop: 7,
              }}
              source={IMAGE.HomeNav}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteStack"
        component={FavoriteStack}
        // listeners={{
        //   tabPress: e => {
        //     getRefreshLead  ? navigation.push('LeadScreen'):null
        //   },
        // }}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.Green : "#AEAEB2",
                fontSize: 10,
                marginTop: 7,
              }}
            >
              Favorites
            </Text>
          ),

          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 23,
                height: 23,
                tintColor: focused ? COLORS.Green : "#AEAEB2",
                resizeMode: "contain",
                marginTop: 15,
              }}
              source={IMAGE.StarNav}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ShopStack"
        component={ShopStack}
        // listeners={{
        //   tabPress: e => {
        //      navigation.push('MapScreen')

        //   },
        // }}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.Green : "#AEAEB2",
                fontSize: 10,
                marginTop: 7,
              }}
            >
              Shop
            </Text>
          ),
          // tabBarBadge:YourCartListData === null ||0 ? countData:  YourCartListData?.length == 0 ? 0 : YourCartListData?.length -1,

          // tabBarBadge:YourCartListData === null||0 ?countData: YourCartListData?.length-1,
          tabBarBadgeStyle: {
            backgroundColor: "#56AB2F", // change the background color of the badge
            color: "white", // change the text color of the badge
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 23,
                height: 23,
                tintColor: focused ? COLORS.Green : "#AEAEB2",
                resizeMode: "contain",
                marginTop: 15,
              }}
              source={IMAGE.ShoppingNav}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.Green : "#AEAEB2",
                fontSize: 10,
                marginTop: 7,
              }}
            >
              Profile
            </Text>
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 23,
                height: 23,
                tintColor: focused ? COLORS.Green : "#AEAEB2",
                resizeMode: "contain",
                marginTop: 15,
              }}
              source={IMAGE.UserNav}
            />
          ),
        }}
      />

      {/* <Stack.Screen name={'SettingStack'} component={SettingStack} />
<Stack.Screen name={'HomeViewListing'} component={HomeViewListing} /> */}
    </Tab.Navigator>
  );
};

export default BottomStack;
