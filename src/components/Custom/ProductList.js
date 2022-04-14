import React, {useState, useEffect} from 'react';
import {Box, HStack, ScrollView, Divider, Heading, VStack} from 'native-base';
import {Text} from 'react-native';
export default function ProductList({listItems}) {
  return (
    <Box
      mb={1}
      overflow="scroll"
      height="100%"
      bgColor="white"
      rounded={1}
      p={2}
      my={1}>
      <Heading>Product List</Heading>
      {listItems.length < 1 ? (
        <Text>No Items Added</Text>
      ) : (
        <Box height="100%">
          <HStack shadow={1} bgColor="white" mb={2} px={2} py={2}>
            <Box width="45%">
              <Text>Name</Text>
            </Box>
            <HStack width="55%" display="flex" justifyContent="space-between">
              <Text>Rate</Text>
              <Text>Qty</Text>
              <Text>Total</Text>
            </HStack>
          </HStack>
          <ScrollView height="100%">
            <VStack height="100%">
              <ScrollView>
                {listItems.map(item => (
                  <Box>
                    <HStack p={2} key={item.key}>
                      <Box width="45%">
                        <Text>{item.name}</Text>
                      </Box>
                      <HStack
                        width="55%"
                        display="flex"
                        justifyContent="space-between">
                        <Text>{item.rate}</Text>
                        <Text>{item.qty}</Text>
                        <Text>{item.total}</Text>
                      </HStack>
                    </HStack>
                    <Divider></Divider>
                  </Box>
                ))}
              </ScrollView>
            </VStack>
          </ScrollView>
        </Box>
      )}
    </Box>
  );
}
