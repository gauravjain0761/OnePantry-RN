import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, ItemDetails} from '../Screens';
import ViewAllListing from '../Screens/HomeScreens/ViewAllListing';
import Search from '../Screens/HomeScreens/Search';
import ShowAllCategory from '../Screens/HomeScreens/ShowAllCategory';
import {ScreenNames} from '../Constant';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.Homes}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.ViewAllListing}
        component={ViewAllListing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.ItemDetails}
        component={ItemDetails}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={ScreenNames.Search}
        component={Search}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={ScreenNames.ShowAllCategory}
        component={ShowAllCategory}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
