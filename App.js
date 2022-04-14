import React from 'react';
import {Box, NativeBaseProvider} from 'native-base';
import {LogBox} from 'react-native';
import {ProductStoreProvider} from './src/Contexts/ProductContext';
import ScreenNavigation from './src/components/Screens/ScreenNavigation';

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <NativeBaseProvider>
      <Box bgColor="blueGray.200" height="100%" px="0">
        <ProductStoreProvider>
          <ScreenNavigation />
        </ProductStoreProvider>
      </Box>
    </NativeBaseProvider>
  );
}
