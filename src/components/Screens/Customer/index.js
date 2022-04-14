import React, {useEffect, useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  Flex,
  ScrollView,
  Fab,
  Modal,
  Center,
  Avatar,
  FormControl,
  Input,
  Button,
  Pressable,
  HStack,
} from 'native-base';

import Icon from 'react-native-vector-icons/dist/Feather';
import {ActivityIndicator, Text} from 'react-native';
import axios from 'axios';
import {primary, primaryColor, URL} from '../../Constants';

export default function Customers({navigation}) {
  let total = 0;
  const [modal, showModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterCustomers, setFilterCustomers] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customers, setCustomers] = useState([]);

  const handleCustomerAdd = async () => {
    try {
      console.log(customerName);
      const res = await axios.post(`${URL}/customers/add-customer`, {
        name: customerName,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    showModal(false);
  };
  const getCustomers = async () => {
    const res = await axios.get(`${URL}/customers/all-customers`);
    console.log(res.data);
    res.data.map(customer => {
      let finalSum = 0;
      customer.entries.map(entry => {
        finalSum = finalSum + entry.total;
      });

      console.log('Final sum is:' + finalSum);
      customer.finalSum = finalSum;
    });
    setCustomers(res.data);
    setFilterCustomers(res.data);
    setLoading(false);
  };

  const handleCustomerPress = customer => {
    console.log(customer.name);
    navigation.navigate('Customer Info', {
      customer: customer,
    });
  };
  const handleSearch = e => {
    setFilterCustomers(
      customers.filter(customer =>
        customer.name.toLowerCase().includes(e.toLowerCase()),
      ),
    );
  };
  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <NativeBaseProvider>
      {loading ? (
        <Center alignSelf="center" justifyContent="center" my="auto">
          {' '}
          <ActivityIndicator
            size="large"
            color={primaryColor}></ActivityIndicator>
        </Center>
      ) : (
        <Box bgColor="white">
          <Box
            width="99%"
            mt={1}
            borderRadius="10"
            height="16"
            mx="auto"
            bgColor="white">
            <Input
              px={2}
              height="100%"
              onChangeText={handleSearch}
              placeholder="Search Customer..."
              borderRadius="10"
              InputRightElement={
                <Box marginRight={4} marginTop={1}>
                  <Icon size={20} name="search" />
                </Box>
              }
            />
          </Box>
          <ScrollView height="90%">
            <Box height="100%" width="100%" p={1} mx="auto" rounded="lg">
              <Flex direction="row" width="100%" flexWrap="wrap">
                {filterCustomers.map(customer => {
                  return (
                    <Pressable
                      onPress={() => handleCustomerPress(customer)}
                      alignItems="center"
                      m="auto"
                      justifyContent="center"
                      shadow={3}
                      borderRadius={3}
                      bgColor="white"
                      width="98%"
                      m={1}
                      p={1}
                      height={20}>
                      <HStack
                        pl={1}
                        width="100%"
                        height="100%"
                        justifyContent="space-between"
                        alignItems="center">
                        <HStack alignItems="center">
                          <Avatar
                            my="1"
                            background="white"
                            shadow={2}
                            borderWidth={1}
                            color="blue.500"
                            mr={1}
                            borderColor={primary}>
                            <Text>{customer.name[0]}</Text>
                          </Avatar>
                          <Text style={{fontSize: 15}}> {customer.name} </Text>
                        </HStack>

                        <Text style={{color: 'green', fontSize: 15}}>
                          {' '}
                          {customer.finalSum}/-{' '}
                        </Text>
                      </HStack>
                    </Pressable>
                  );
                })}
              </Flex>
            </Box>
          </ScrollView>
        </Box>
      )}
      <Modal isOpen={modal} onClose={() => showModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add Customer</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label width="100%">
                <Text>Customer Name</Text>
              </FormControl.Label>
              <Input onChangeText={e => setCustomerName(e)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  showModal(false);
                }}>
                <Text>Cancel</Text>
              </Button>
              <Button onPress={handleCustomerAdd}>
                <Text style={{color: 'white'}}>Add</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Fab
        onPress={() => showModal(true)}
        placement="bottom-right"
        bgColor={primary}
        size="16"
        icon={<Icon name="plus" size={20} color="white" />}
      />
    </NativeBaseProvider>
  );
}
