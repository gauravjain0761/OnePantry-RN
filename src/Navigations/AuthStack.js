import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WalkThorough, Login, Registration} from '../Screens';
import {ScreenNames} from '../Constant';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.Login}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.WalkThorough}
        component={WalkThorough}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.Registration}
        component={Registration}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
