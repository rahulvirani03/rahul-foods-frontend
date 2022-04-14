import axios from 'axios';
import {
  Box,
  HStack,
  VStack,
  Modal,
  Pressable,
  Button,
  ScrollView,
  Actionsheet,
  Input,
  Heading,
  useToast,
  Center,
  Flex,
} from 'native-base';

import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Feather';
import {Text} from 'react-native';
import {primary, URL} from '../../Constants';

export default function EntryBillInfo({navigation, route}) {
  const toast = useToast();
  const {customer} = route.params;
  console.log(customer);
  navigation.setOptions({title: customer.name});
  let itemTotal = 0;
  let tempUpdateEntry = {};
  const [customerEntries, setCustomerEntries] = useState();
  const [completeTotal, setCompleteTotal] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedCust, setSelectCust] = useState('');
  const [loading, setLoading] = useState(true);

  const getEntryDates = data => {
    let tempEntries = [];
    data?.entries.map(entry => {
      const d = new Date(entry.date);
      let entryDate;
      const day = d.getDate();
      let month = d.getMonth();
      if (month < 9) {
        entryDate = `${day}/0${++month}`;
      } else {
        entryDate = `${day}/${++month}`;
      }
      const tempEntry = {
        date: entryDate,
        items: entry.items,
        total: entry.total,
      };
      tempEntries.push(tempEntry);
    });

    setSelectCust(tempEntries);
    setLoading(false);
  };
  const handlePress = async () => {
    console.log(selectedCust);
    const result = await axios.post(`${URL}/bills/entry-bill`, {
      customerInfo: customer,
      customerEntries: selectedCust,
      entryTotal: completeTotal,
    });
    console.log(result.data);
    const {message} = result.data;
    console.log(message);
    if (message === 'Mail send') {
      setLoading(false);
      toast.show({
        description: 'Invoice Sent ',
      });
      navigation.navigate('Home');
    }
  };

  const getEntries = async () => {
    let temptotal = 0;
    const entries = await axios.post(`${URL}/entries/get-entries`, {
      id: customer._id,
    });
    console.log(entries.data);
    setCustomerEntries(entries.data);
    entries.data.entries.map(entry => {
      temptotal = temptotal + entry.total;
    });
    console.log(temptotal);
    setCompleteTotal(temptotal);
    getEntryDates(entries.data);
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <Box px={1} height="100%">
      {loading ? (
        <Box>
          <Text>Loading...</Text>
        </Box>
      ) : (
        <ScrollView bgColor="white" height="100%">
          <VStack px={2} py={2} shadow={1} bgColor="white">
            <ScrollView>
              {selectedCust.map(entry => (
                <Pressable>
                  <Box
                    borderWidth={1}
                    bgColor="white"
                    shadow={1}
                    minHeight="16"
                    rounded={3}
                    borderColor="coolGray.300"
                    p={1}
                    mb={2}>
                    <VStack>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          marginBottom: 10,
                        }}>
                        {entry.date}
                      </Text>
                      <HStack
                        width="100%"
                        display="flex"
                        justifyContent="space-between">
                        <HStack width="70%" display="flex" flexWrap="wrap">
                          {entry.items.map(item => {
                            return (
                              <Box>
                                <Text style={{fontSize: 16}}>
                                  {item.qty} {item.name} ({item.rate}),
                                </Text>
                              </Box>
                            );
                          })}
                        </HStack>
                        <Box
                          width="30%"
                          px={2}
                          alignItems="flex-end"
                          justifyContent="center">
                          <Text style={{fontSize: 18, color: 'green'}}>
                            {entry.total}/-
                          </Text>
                        </Box>
                      </HStack>
                    </VStack>
                  </Box>
                </Pressable>
              ))}
            </ScrollView>
          </VStack>
        </ScrollView>
      )}
      <Center mb={0.5} my="auto" position="absolute" width="100%" bottom="0">
        <Flex height={20} width="100%">
          <HStack
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
            px={4}
            height={10}>
            <Text>Total </Text>
            <Text>
              {' '}
              <Text style={{fontSize: 15}}>₹</Text> {completeTotal}/-
            </Text>
          </HStack>
          <Box width="100%">
            <Button bgColor={primary} onPress={handlePress} width="100%">
              <Text style={{color: 'white'}}>Make Bill</Text>
            </Button>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}
