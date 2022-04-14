import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import CreateEntry from './Entry/CreateEntry';
import CustomerInfo from './Customer/CustomerInfo';
import CreateBillList from './Bill/CreateBillList';
import SaveEntry from './Entry/SaveEntry';
import MakeBill from './Bill/MakeBill';
import EntryBillInfo from './Bill/EntryBillInfo';
import {primaryColor} from '../Constants';
import {getProductsContext} from '../../Contexts/ProductContext';
const Stack = createNativeStackNavigator();
export default function ScreenNavigation() {
  const product = getProductsContext();
  console.log('The product data is ');
  console.log(product);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            color: primaryColor,
            bgColor: primaryColor,
          },
        }}
        initialRouteName="Home">
        <Stack.Screen
          name="Rahul Foods"
          component={Home}
          options={{showHeader: false}}
        />
        <Stack.Screen name="Create Entry" component={CreateEntry} />
        <Stack.Screen name="Show Items" component={SaveEntry} />
        <Stack.Screen name="Bill Entries" component={CreateBillList} />
        <Stack.Screen
          options={{headerShown: false}}
          name="Make Bill"
          component={MakeBill}
        />
        <Stack.Screen
          name="Customer Info"
          component={CustomerInfo}
          options={{title: 'Customer Info'}}
        />
        <Stack.Screen
          name="Entry Bill Info"
          component={EntryBillInfo}
          options={{title: 'Customer Info'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
