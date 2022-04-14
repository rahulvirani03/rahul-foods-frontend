import {
  Box,
  Button,
  NativeBaseProvider,
  Center,
  KeyboardAvoidingView,
  HStack,
} from 'native-base';

import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import AddProduct from '../../Custom/AddProduct';
import ProductList from '../../Custom/ProductList';
import Icon from 'react-native-vector-icons/dist/Feather';
import axios from 'axios';
import {primary, URL} from '../../Constants';
import {useIsFocused} from '@react-navigation/native';

export default function CreateBillList({route, navigation}) {
  const isFocused = useIsFocused();
  console.log({isFocused});
  const {customer} = route.params;
  console.log(customer);
  let itemTotal = '';
  const [rate, setRate] = useState(0);
  const [products, setProducts] = useState();
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [itemName, setItemName] = useState('');
  const [listItems, setListItems] = useState([]);
  const handleEnter = () => {
    setTotal(total + rate * qty);
    setListItems([
      ...listItems,
      {
        name: itemName,
        rate: rate,
        qty: qty,
        total: rate * qty,
      },
    ]);
    setItemName('');
    setRate(0);
    setQty(0);
  };
  const handlePress = item => {
    console.log('Pressed');
    console.log({itemTotal});
    navigation.navigate('Make Bill', {
      customer: customer,
      listItems: listItems,
      setListItems: setListItems,
      itemTotal: total,
    });
  };
  const calculateTotal = () => {
    console.log('called');
    itemTotal = (rate * qty).toString();
    console.log(itemTotal);
  };
  const getProducts = async () => {
    const result = await axios.get(`${URL}/products/all-products`);
    setProducts(result.data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    console.log('Items');
    console.log(listItems);
  }, [isFocused]);
  return (
    <NativeBaseProvider>
      <Box p={1} rounded="lg" height="100%" mx={0.5}>
        <Center minHeight="40%">
          <AddProduct
            products={products}
            itemName={itemName}
            setItemName={setItemName}
            rate={rate}
            setRate={setRate}
            qty={qty}
            setQty={setQty}
            calculateTotal={calculateTotal}
            handleEnter={handleEnter}
          />
        </Center>

        <Box height="52%">
          <ProductList listItems={listItems} />
        </Box>
        <Box height="8%" borderTopWidth="1">
          <KeyboardAvoidingView>
            <Box
              bgColor="white"
              mt={-1}
              display={'flex'}
              justifyContent={'center'}
              borderWidth="1"
              borderColor="blueGray.200"
              width="100%">
              <HStack
                p={2}
                display="flex"
                justifyContent="space-between"
                alignContent="center">
                <Box>
                  <Text> Total Amount {total.toString()}</Text>
                </Box>
                <Button
                  justifyContent="center"
                  width="20"
                  height={9}
                  bgColor={primary}
                  rightIcon={<Icon name="arrow-right" color="white" />}
                  onPress={handlePress}>
                  <Text style={{color: 'white'}}>Next</Text>
                </Button>
              </HStack>
            </Box>
          </KeyboardAvoidingView>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
