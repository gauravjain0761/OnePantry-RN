import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SaleItem,
  AddItemScreen,
  SellerItemDetails,
  EditItemScreen,
} from '../Screens';

import SellerDetail from '../Screens/SettingScreens/SellerDetail';
import {ScreenNames} from '../Constant';

const Stack = createStackNavigator();

const SellerStack = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.SaleItem}>
      <Stack.Screen
        name={ScreenNames.SaleItem}
        component={SaleItem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.AddItemScreen}
        component={AddItemScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.EditItemScreen}
        component={EditItemScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.SellerDetail}
        component={SellerDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.SellerItemDetail}
        component={SellerItemDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SellerStack;
