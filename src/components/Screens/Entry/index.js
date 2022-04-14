import React, {useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  Box,
  Input,
  HStack,
  Avatar,
  ScrollView,
  Divider,
  Button,
  Pressable,
  Heading,
} from 'native-base';
import Icon from 'react-native-vector-icons/dist/Feather';
import {Text, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {primary, primaryColor, URL} from '../../Constants';
import ActivityIndicatorViewNativeComponent from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent';

export default function Entry({navigation}) {
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [filterCustomers, setFilterCustomers] = useState([]);
  const [todaysEntries, setTodaysEntries] = useState([]);
  const [filterTodaysEntries, setFilterTodaysEntries] = useState([]);

  const handlePress = customer => {
    navigation.navigate('Create Entry', {
      customer: customer,
    });
  };

  const getAllCustomers = async () => {
    // console.log('Today Details');
    // const currDate = new Date();
    // const currday = currDate.getDate();
    // console.log(currday);
    // let tempCustomerList = [];
    // getEntriesURL = `${URL}/entries/today-entry`;
    getCustomersURL = `${URL}/customers/all-customers`;
    //const res = await axios.get(getEntriesURL);
    const customerRes = await axios.get(getCustomersURL);

    //console.log(customerRes.data);
    // res.data.map(customer => {
    //   customer.entries.map(entry => {
    //     const entryDate = new Date(entry.date);
    //     const entryday = entryDate.getDate();
    //     if (currday === entryday) {
    //       console.log('Inside If');
    //       tempCustomerList.push(customer);
    //       console.log(customer.name);
    //       console.log(entry.items);
    //     }
    //   });
    // });
    // setTodaysEntries(res.data);
    // setFilterTodaysEntries(res.data);
    setCustomers(customerRes.data);
    setFilterCustomers(customerRes.data);
    setLoading(false);
  };
  const handleSearch = e => {
    console.log(e);
    if (e.length >= 1) {
      setIsSearching(true);
      setFilterCustomers(
        customers.filter(customer =>
          customer.name.toLowerCase().includes(e.toLowerCase()),
        ),
      );
    } else {
      setIsSearching(false);
    }
  };
  useEffect(() => {
    getAllCustomers();
  }, []);
  useEffect(() => {
    console.log(isSearching);
  }, [isSearching]);
  return (
    <NativeBaseProvider>
      {loading ? (
        <Box
          height="100%"
          alignItems="center"
          display="flex"
          justifyContent="center">
          <ActivityIndicator size="large" color={primaryColor} />
        </Box>
      ) : (
        <Box background="white" p={1} rounded="lg">
          <Input
            px={2}
            onChangeText={handleSearch}
            placeholder="Search Customer..."
            borderRadius="10"
            InputRightElement={
              <Box marginRight={4} marginTop={4}>
                <Icon size={20} name="search" />{' '}
              </Box>
            }
          />
          <Box p={1} height="92%">
            <ScrollView>
              <Box>
                <Box p={0.5}>
                  {filterCustomers.map(item => {
                    return (
                      <Pressable onPress={() => handlePress(item)}>
                        <HStack
                          rounded={2}
                          p={2}
                          mb={2}
                          bgColor="white"
                          shadow={1}>
                          <Avatar
                            my="2"
                            background="white"
                            shadow={2}
                            borderWidth={1}
                            color={primary}
                            borderColor={primary}>
                            <Text>{item.name[0]}</Text>
                          </Avatar>
                          <Box mx={3} my={5}>
                            <Text>{item.name}</Text>
                          </Box>
                        </HStack>
                      </Pressable>
                    );
                  })}
                </Box>
                {/* ) : (
                <Box padding={1}>
                  {todaysEntries.length < 1 ? (
                    <Box>
                      <Text>No Entries Yet For the Day</Text>
                    </Box>
                  ) : (
                    <Box>
                      <Heading>Todays Entries</Heading>
                      {filterTodaysEntries.map(item => {
                        return (
                          <Pressable onPress={() => handlePress(item)}>
                            <HStack
                              width="99%"
                              rounded={2}
                              p={2}
                              bgColor="white"
                              mb={1}
                              shadow={2}>
                              <Avatar
                                my="2"
                                background="blueGray.200"
                                borderWidth={2}
                                color="blue.500"
                                borderColor={primary}>
                                <Text>{item.name[0]}</Text>
                              </Avatar>
                              <Box mx={3} my={5}>
                                <Text>{item.name}</Text>
                              </Box>
                            </HStack>
                          </Pressable>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              )} */}
              </Box>
            </ScrollView>
          </Box>
        </Box>
      )}
    </NativeBaseProvider>
  );
}
