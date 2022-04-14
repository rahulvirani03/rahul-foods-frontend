import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  HStack,
  Button,
  Center,
  KeyboardAvoidingView,
  Alert,
  useToast,
} from 'native-base';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/Feather';
import {Text, ScrollView, TouchableOpacity, Pressable} from 'react-native';
import AddProduct from '../../Custom/AddProduct';
import ProductList from '../../Custom/ProductList';
import {primary, URL} from '../../Constants';
import {useIsFocused} from '@react-navigation/native';

export default function CreateEntry({route, navigation}) {
  const toast = useToast();
  const isFocused = useIsFocused();
  console.log({isFocused});
  let itemTotal = '';
  const [products, setProducts] = useState([]);
  const {customer} = route.params;

  const [filteredProd, setFilterProd] = useState([]);
  const [total, setTotal] = useState(0);
  const [listItems, setListItems] = useState([]);
  const [rate, setRate] = useState(0);
  const [qty, setQty] = useState(0);
  const [showList, setShowList] = useState(false);
  const [itemName, setItemName] = useState('');
  const handlePress = item => {
    console.log('Pressed');
    console.log({itemTotal});
    navigation.navigate('Show Items', {
      listItems: listItems,
      setListItems: setListItems,
      customer: customer,
      itemTotal: total,
    });
  };
  const getProducts = async () => {
    const result = await axios.get(`${URL}/products/all-products`);
    setProducts(result.data);
  };
  const handleChange = e => {
    console.log(e);
    if (e.length > 0) {
      let tempList = [];
      products.map(product => {
        if (product.Name.toLowerCase().includes(e.toLowerCase())) {
          tempList.push(product);
        } else {
          setShowList(false);
        }
      });
      try {
        console.log(tempList[0].Name);
        setFilterProd(tempList);
        setShowList(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      setFilterProd([]);
      setShowList(false);
    }
  };
  const handleNameSelect = val => {
    setItemName(val);
  };
  const handleEnter = () => {
    if (!itemName || !rate || !qty) {
      toast.show({
        placement: 'top-right',
        status: 'error',
        render: () => {
          return (
            <Box
              bg="red.400"
              color="white"
              px="3"
              py="2"
              mx={2}
              rounded="sm"
              mb={5}>
              Please fill all fields
            </Box>
          );
        },
      });
      return;
      console.log('Null values found');
    }

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

  const calculateTotal = () => {
    console.log('called');
    itemTotal = (rate * qty).toString();
    console.log(itemTotal);
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    console.log('Items');
    console.log(listItems);
  }, [isFocused]);
  useEffect(() => {
    console.log(total);
  }, [total]);
  useEffect(() => {
    navigation.addListener('focus', () => {
      console.log(listItems);
      console.log('Route params are' + route.params.tempItems);
    });
  }, []);

  return (
    <NativeBaseProvider>
      <Box
        p={1}
        rounded="lg"
        height="100%"
        display="flex"
        flexDirection="column"
        mx={0.5}>
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

        <Box mt={1} borderTopWidth="1" height="8%">
          <Box bgColor="white" py={2} height="100%" width="100%">
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
                <Text style={{color: 'white'}}> Next</Text>
              </Button>
            </HStack>
          </Box>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
