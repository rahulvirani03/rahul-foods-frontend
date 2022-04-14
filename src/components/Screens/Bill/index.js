import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import InstantBill from './InstantBill';
import Entry from '../Entry';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EntryBill from './EntryBill';

const Tab = createMaterialTopTabNavigator();

function MyTabs({navigation}) {
  return (
    <Box height="100%" width="100%">
      <Tab.Navigator>
        <Tab.Screen name="Instant Bill" component={InstantBill} />
        <Tab.Screen name="Entry Bill" component={EntryBill} />
      </Tab.Navigator>
    </Box>
  );
}

export default function Bill({navigation}) {
  return (
    <NativeBaseProvider>
      <Box height="100%" width="100%" bg="blueGray.100" rounded="lg">
        <MyTabs navigation={navigation} />
      </Box>
    </NativeBaseProvider>
  );
}
