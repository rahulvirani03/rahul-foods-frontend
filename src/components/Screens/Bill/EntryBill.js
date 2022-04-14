import React, {useState, useEffect} from 'react';
import {Box, Center, HStack, ScrollView, Flex, Pressable} from 'native-base';
import {Text, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {URL} from '../../Constants';
export default function EntryBill({navigation}) {
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [customers, setCustomers] = useState([]);
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
    setLoading(false);
  };

  const handleCustomerPress = customer => {
    console.log(customer.name);
    console.log(navigation);
    navigation.navigate('Entry Bill Info', {
      customer: customer,
    });
  };
  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <Box>
      {loading ? (
        <Center alignSelf="center" justifyContent="center" my="auto">
          <ActivityIndicator size="large" color="blue"></ActivityIndicator>
        </Center>
      ) : (
        // <ScrollView height="100%">
        //   <Box height="200%" p={5} mx="auto" rounded="lg">
        //     <Flex direction="row" width="100%" flexWrap="wrap">
        //       {customers.map(customer => {
        //         return (
        //           <Pressable
        //             onPress={() => handleCustomerPress(customer)}
        //             alignItems="center"
        //             m="auto"
        //             justifyContent="center"
        //             shadow={2}
        //             bgColor="white"
        //             width="45%"
        //             m={1}
        //             p={1}
        //             height={100}>
        //             <Text> {customer.name} </Text>
        //           </Pressable>
        //         );
        //       })}
        //     </Flex>
        //   </Box>
        // </ScrollView><ScrollView height="100%">
        <ScrollView>
          <Box height="100%" p={1} mx="auto" rounded="lg">
            <Flex direction="row" width="100%" flexWrap="wrap">
              {customers.map(customer => {
                return (
                  <Pressable
                    onPress={() => handleCustomerPress(customer)}
                    alignItems="center"
                    m="auto"
                    justifyContent="center"
                    shadow={2}
                    borderRadius={3}
                    bgColor="white"
                    width="100%"
                    m={1}
                    mr={3}
                    p={1}
                    height={20}>
                    <HStack
                      width="100%"
                      height="100%"
                      justifyContent="space-between"
                      alignItems="center">
                      <Text style={{fontSize: 15}}> {customer.name} </Text>

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
      )}
    </Box>
  );
}
