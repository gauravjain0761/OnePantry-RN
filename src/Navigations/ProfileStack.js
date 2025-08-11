import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '../Screens';
import PrivacyPolicy from '../Screens/DrawerScreens/PrivacyPolicy';
import ManageShop from '../Screens/DrawerScreens/ManageShop';
import Settings from '../Screens/DrawerScreens/Settings';
import {ScreenNames} from '../Constant';
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.Profile}>
      <Stack.Screen
        name={ScreenNames.Profile}
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.PrivacyPolicy}
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.ManageShop}
        component={ManageShop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.Settings}
        component={Settings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
