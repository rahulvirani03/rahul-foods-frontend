import React, {useState} from 'react';
import {
  NativeBaseProvider,
  Flex,
  Button,
  Box,
  VStack,
  HStack,
  KeyboardAvoidingView,
} from 'native-base';
import BottomTabs from './BottomTabs';

export default function Home({navigation}) {
  const [selected, setSelected] = useState(0);
  return (
    <NativeBaseProvider>
      <Box height="100%">
        <BottomTabs />
      </Box>
    </NativeBaseProvider>
  );
}
