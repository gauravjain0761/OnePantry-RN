import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomDrawerContent} from '../Components';
import PrivacyPolicy from '../Screens/DrawerScreens/PrivacyPolicy';
import ManageShop from '../Screens/DrawerScreens/ManageShop';
import Settings from '../Screens/DrawerScreens/Settings';
import BottomStack from './BottomStack';
import {wp} from '../Utils';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerStyle: {width: wp(75)}}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeTabs"
        component={BottomStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageShop"
        component={ManageShop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
