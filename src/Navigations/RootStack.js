import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createNavigationContainerRef} from '@react-navigation/native';
import {Splash} from '../Screens';
import {ScreenNames} from '../Constant';
import AuthStack from './AuthStack';
import SellerStack from './SellerStack';
import DrawerStack from './DrawerStack';
import ProductScanRNCamera from '../Screens/SellerScreens/BarCodeScanner';
import SettingStack from './SettingStack';
import Followers from '../Screens/Followers/Follower';
import HomeViewListing from '../Screens/HomeScreens/HomeViewListing';
import SellerDetail from '../Screens/SettingScreens/SellerDetail';
import {useNavigation} from '../Hook';

const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef();
//...TransitionPresets.ModalSlideFromBottomIOS stack navigator props for ios HeaderTabStack
const RootStack = () => {
  useNavigation();
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Stack.Navigator
        initialRouteName={ScreenNames.Splash}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={ScreenNames.Splash} component={Splash} />
        <Stack.Screen name={ScreenNames.AuthStack} component={AuthStack} />
        <Stack.Screen name={ScreenNames.DrawerStack} component={DrawerStack} />
        <Stack.Screen name={ScreenNames.SellerStack} component={SellerStack} />
        <Stack.Screen
          name={ScreenNames.ProductScanRNCamera}
          component={ProductScanRNCamera}
        />
        <Stack.Screen
          name={ScreenNames.SettingStack}
          component={SettingStack}
        />
        <Stack.Screen
          name={ScreenNames.HomeViewListing}
          component={HomeViewListing}
        />
        <Stack.Screen
          name={ScreenNames.Followers}
          component={Followers}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenNames.SellerDetail}
          component={SellerDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
