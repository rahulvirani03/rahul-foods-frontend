import React, {useState} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Divider,
  Heading,
  ScrollView,
  VStack,
  Button,
  Pressable,
  Menu,
  useDisclose,
  Actionsheet,
  Card,
} from 'native-base';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import axios from 'axios';
import {primary} from '../Constants';
export default function ShowItems({
  items,
  handleSave,
  itemTotal,
  handleEdit,
  openAction,
  setOpenAction,
  handleDelete,
  setDeleteItem,
  setEditItem,
  bill,
}) {
  console.log(bill);

  return (
    <Box>
      <Box
        mb={1}
        overflow="scroll"
        height="90%"
        bgColor="white"
        mx={0}
        rounded={1}
        p={2}
        my={1}>
        <Heading px={2}>Items</Heading>

        <ScrollView>
          <VStack px={2} py={2} shadow={1} bgColor="white">
            <ScrollView>
              {items.map(item => (
                <Pressable
                  onLongPress={() => {
                    console.log('Pressed');
                    setEditItem(item);
                    setDeleteItem(item);
                    setOpenAction(true);
                  }}>
                  <Box
                    borderWidth={1}
                    bgColor="white"
                    shadow={1}
                    rounded={3}
                    borderColor="coolGray.300"
                    p={1}
                    mb={2}>
                    <VStack>
                      <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                        {item.name}
                      </Text>
                      <HStack>
                        <Text style={{paddingRight: 5}}>Rate: {item.rate}</Text>
                        <Text style={{paddingLeft: 5}}>Qty :{item.qty}</Text>
                      </HStack>
                      <Text>Total : {item.total}/-</Text>
                    </VStack>
                  </Box>
                </Pressable>
              ))}
            </ScrollView>
          </VStack>
        </ScrollView>
        <Actionsheet isOpen={openAction} onClose={() => setOpenAction(false)}>
          <Actionsheet.Content>
            <Actionsheet.Item p={0} onPress={handleEdit}>
              <HStack m={0}>
                <Icon name="edit" size={15} />
                <Text> Edit</Text>
              </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item p={0} onPress={handleDelete}>
              <HStack>
                <Icon name="trash" size={15} />
                <Text> Delete</Text>
              </HStack>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Box>
      <Box shadow={2} mt={-2} bgColor="white" width="110%" height="10%">
        <HStack
          p={3}
          display="flex"
          justifyContent="space-between"
          alignContent="center">
          <Box mt={2}>
            <Text> Final Amount: {itemTotal}/-</Text>
          </Box>
          <Button
            mt={1}
            justifyContent="center"
            width="40"
            onPress={handleSave}
            bgColor={primary}
            mx={10}
            height="100%"
            rightIcon={<Icon name="save" color="white" />}>
            {bill ? (
              <Text style={{color: 'white'}}>Make Bill</Text>
            ) : (
              <Text style={{color: 'white'}}>Save</Text>
            )}
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
