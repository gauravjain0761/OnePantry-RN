import auth from "@react-native-firebase/auth";
import React, { useCallback, useState } from "react";
import { View, Image } from "react-native";
import { useDispatch } from "react-redux";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Images, ScreenNames } from "../../../Constant";
import { ShowAlert } from "../../../Utils";
import { logoutUser } from "../../../Store";
import DrawerProfile from "../DrawerProfile";
import useStyle from "./styles";

const CustomDrawerContent = (props) => {
  const styles = useStyle();
  const { navigate, reset } = useNavigation();
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(0);
  const data = [
    {
      name: "Home Listing",
      logo: Images.homeNav,
      logoActive: Images.activeHome,
      root: ScreenNames.Home,
      stack: ScreenNames.HomeStack,
    },
    {
      name: "Profile",
      right: "1",
      logo: Images.userSideBar,
      logoActive: Images.activeUser,
      stack: ScreenNames.ProfileStack,
      root: ScreenNames.Profile,
    },
    {
      name: "Manage Shop",
      right: "1",
      logo: Images.manage,
      logoActive: Images.manage,
      root: ScreenNames.ManageShop,
      stack: ScreenNames.SellerStack,
    },
    {
      name: "Settings",
      right: "1",
      logo: Images.setting,
      logoActive: Images.setting,
      root: ScreenNames.Settings,
      stack: ScreenNames.DrawerStack,
    },
    {
      name: "Privacy Policy",
      logo: Images.privacy,
      logoActive: Images.activePrivacy,
      root: ScreenNames.PrivacyPolicy,
      stack: ScreenNames.DrawerStack,
    },
    {
      name: "Logout",
      root: "Login",
      logo: Images.logout,
      logoActive: Images.logout,
      stack: ScreenNames.AuthStack,
    },
  ];

  const logoutHandler = useCallback(() => {
    props.navigation.closeDrawer();

    props.navigation?.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: ScreenNames.AuthStack }],
      })
    );

    dispatch(logoutUser());
    setFocused(-1);
    auth().signOut();
  }, []);

  const onPressHandler = useCallback((item, index) => {
    setFocused(index);
    if (item.name == "Logout") {
      const alertObject = {
        title: "Logout",
        message: "Are you sure you want to logout?",
        okText: "Confirm",
        onPressOk: logoutHandler,
      };
      return ShowAlert(alertObject);
    }
    navigate(item.stack, { screen: item.root });
    props.navigation.closeDrawer();
  }, []);

  return (
    <View style={styles.container}>
      <DrawerProfile />
      <DrawerContentScrollView {...props}>
        {data.map((item, index) => {
          const isFocused = focused == index;
          return (
            <View key={index}>
              <DrawerItem
                label={item.name}
                labelStyle={[styles.label, isFocused && styles.selectedLabel]}
                style={[styles.item, isFocused && styles.selectedItem]}
                icon={() => (
                  <Image
                    style={[styles.icon, isFocused && styles.selectedIcon]}
                    source={isFocused ? item.logoActive : item.logo}
                    resizeMode="contain"
                  />
                )}
                onPress={() => onPressHandler(item, index)}
              />
            </View>
          );
        })}
      </DrawerContentScrollView>
    </View>
  );
};
export default CustomDrawerContent;
