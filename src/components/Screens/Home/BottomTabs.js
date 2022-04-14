import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Bill from '../Bill';
import Customers from '../Customer';
import Entry from '../Entry';
import Products from '../Product';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/dist/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {primary} from '../../Constants';

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBarBackground="blue"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Entry"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="pen" color={color} size={size} />
          ),
        }}
        component={Entry}
      />
      <Tab.Screen
        name="Customers"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        component={Customers}
      />
      <Tab.Screen
        name="Bill"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="book-account"
              color={color}
              size={size}
            />
          ),
        }}
        component={Bill}
      />
      <Tab.Screen
        name="Product"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="database" color={color} size={size} />
          ),
        }}
        component={Products}
      />
    </Tab.Navigator>
  );
}
