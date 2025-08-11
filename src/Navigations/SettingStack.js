import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddAddress, AddressForm, EditAddress} from '../Screens';
import AddBankDetails from '../Screens/SettingScreens/AddBankDetails';
import {ScreenNames} from '../Constant';

const Stack = createStackNavigator();
const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.AddAddress}
        component={AddAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.AddressForm}
        component={AddressForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.AddBankDetails}
        component={AddBankDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.EditAddress}
        component={EditAddress}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
